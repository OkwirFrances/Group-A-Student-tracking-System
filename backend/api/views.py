
# views.py

import random
from django.http import JsonResponse
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from datetime import timedelta
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from .models import Issue, Lecturer, Registrar, Department, Course
from .serializers import IssueSerializer, DepartmentSerializer, CourseSerializer, UserUpdateSerializer
from .permissions import IsRegistrar, IsLecturer, IsStudent  

User = get_user_model()

# Helper function to generate OTP
def generate_otp():
    return str(random.randint(100000, 999999))

# Signup View@api_view(['POST'])
def signup(request):
    email = request.data.get('email')
    fullname = request.data.get('fullname', '')  # Optional fullname
    password = request.data.get('password')
    role = request.data.get('role', 'student')

    if not email or not password:
        return JsonResponse({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email, is_active=True).exists():
        return JsonResponse({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)

    # Create an inactive user
    user, created = User.objects.get_or_create(email=email, defaults={'fullname': fullname, 'role': role})
    
    if not created:
        user.fullname = fullname  # Update in case of reattempt
        user.role = role
        user.set_password(password)  # Update password if reattempting signup
    
    user.is_active = False  # User remains inactive until OTP verification
    user.otp = generate_otp()  # Generate OTP
    user.otp_created_at = timezone.now()  # Store OTP timestamp
    user.save()

    send_mail('Your OTP Code', f'Your OTP is {user.otp}', 'Group-A-AITS@mail.com', [email])

    return JsonResponse({'message': 'OTP sent. Verify to activate your account.'}, status=status.HTTP_201_CREATED)



@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return JsonResponse({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return JsonResponse({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)


    if not user.check_password(password):
        return JsonResponse({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)

    # Generate the JWT tokens
    refresh = RefreshToken.for_user(user)
    return JsonResponse({
        'access_token': str(refresh.access_token),
        'refresh_token': str(refresh),
        'role': user.role  # Include the user's role in the response
    }, status=status.HTTP_200_OK)


# OTP Verification View with Expiry@api_view(['POST'])
def verify_otp(request):
    email = request.data.get('email')
    otp = request.data.get('otp')

    if not email or not otp:
        return JsonResponse({'error': 'Email and OTP are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.filter(email=email, is_active=False).first()
    if user:
        otp_created_at = user.otp_created_at
        if otp_created_at and timezone.now() - otp_created_at > timedelta(minutes=10):
            return JsonResponse({'error': 'OTP has expired'}, status=status.HTTP_400_BAD_REQUEST)
        
        if user.otp == otp:
            user.is_active = True  # Activate the user
            user.otp = None
            user.otp_created_at = None  # Clear OTP and timestamp
            user.save()

            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                'message': 'Account verified successfully!',
                'token': str(refresh.access_token)
            }, status=status.HTTP_200_OK)

    return JsonResponse({'error': 'Invalid OTP or email'}, status=status.HTTP_400_BAD_REQUEST)



# Resend OTP View
@api_view(['POST'])
def resend_otp(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.filter(email=email).first()
    if not user:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    user.otp = generate_otp()
    user.otp_created_at = timezone.now()  # Reset the OTP timestamp
    user.save()
    send_mail('Your OTP Code', f'Your OTP is {user.otp}', 'AITS@mail.com', [email])
    return Response({'message': 'OTP resent successfully!'}, status=status.HTTP_200_OK)

# Department View (Only accessible by registrars)
class DepartmentView(generics.ListCreateAPIView):
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated, IsRegistrar]  # Only registrars can create departments

    def get_queryset(self):
        return Department.objects.all()

    def perform_create(self, serializer):
        serializer.save()

# Course View (Only accessible by registrars)
class CourseView(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated, IsRegistrar]  # Only registrars can create courses

    def get_queryset(self):
        return Course.objects.all()

    def perform_create(self, serializer):
        serializer.save()

# Issue View (Only accessible by students for their own issues)
class IssueView(generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'student':
            return Issue.objects.filter(student=self.request.user, course__students=self.request.user)
        return Issue.objects.all()

    def perform_create(self, serializer):
        if self.request.user.role == 'student':
            course = serializer.validated_data.get('course')
            if course and self.request.user not in course.students.all():
                raise PermissionDenied('You can only report issues for courses you are enrolled in.')
            serializer.save(student=self.request.user)
        else:
            raise PermissionDenied('Only students can create issues.')
        

class CreateIssueView(generics.CreateAPIView):
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role == 'student':
            if serializer.is_valid():
                course = serializer.validated_data.get('course')
                if course and self.request.user not in course.students.all():
                    raise PermissionDenied('You can only report issues for courses you are enrolled in.')
            serializer.save(student=self.request.user)
        else:
            raise PermissionDenied('Only students can create issues.')        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
# Filter Issues View (Accessible by students to filter their own issues)
def filter_issues(request):
    user = request.user
    if user.role != 'student':
        return Response({'error': 'Only students can filter issues'}, status=status.HTTP_403_FORBIDDEN)
    
    status= request.GET.get('status', None)

    issues = Issue.filter(student=user)

    if status:
        issues = issues.filter(status=status)


    serializer = IssueSerializer(issues, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)





# Assign Issue View (Only accessible by registrars)
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsRegistrar])  # Only registrars can assign issues
def assign_issue(request, issue_id, lecturer_id):
    issue = get_object_or_404(Issue, id=issue_id)
    lecturer = get_object_or_404(Lecturer, id=lecturer_id)
    
    if issue.course and lecturer.department != issue.course.department:
        return Response({'error': 'Lecturer must belong to the same department as the course'}, status=status.HTTP_400_BAD_REQUEST)
    
    issue.assign_to_lecturer(request.user, lecturer)
    issue.assigned_at = timezone.now()
    issue.save()
    return Response({'message': 'Issue assigned successfully'})

# Resolve Issue View (Accessible by lecturers and registrars)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def resolve_issue(request, issue_id):
    issue = get_object_or_404(Issue, id=issue_id)
    
    if request.user.role in ['registrar', 'lecturer'] and (issue.assigned_to == request.user or request.user.role == 'registrar'):
        issue.resolved_by = request.user
        issue.resolved_at = timezone.now()
        issue.status = 'resolved'
        issue.save()
        return Response({'message': 'Issue resolved successfully'})
    
    return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

# User Info View (Accessible by authenticated users)
class UserInfoView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        user_data = {
            "id": user.id,
            "email": user.email,
            "fullname": user.fullname,
            "role": user.role,
            "phone_number": user.phone_number,
            "profile_picture": user.profile_picture.url if user.profile_picture else None
        }
        return Response(user_data, status=status.HTTP_200_OK)

# User Edit View (Accessible by authenticated users)
class UserEditView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserUpdateSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return response
