from rest_framework import viewsets
from django.core.mail import send_mail
from rest_framework import status, generics
from rest_framework.response import Response
from django.utils import timezone
from .serializers import IssueSerializer, LecturerSerializer, DepartmentSerializer, CourseSerializer, UserUpdateSerializer
from .models import *   
from .serializers import *  # Import all serializers
from .serializers import CourseSerializer, UserUpdateSerializer  # Explicitly import required serializers
from rest_framework.exceptions import PermissionDenied
from django.http import JsonResponse
from .permissions import IsRegistrar, IsLecturer, IsStudent 
from rest_framework.decorators import APIView, api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from django.shortcuts import  get_object_or_404
import random
from django.core.cache import cache  # Import Django cache


User = get_user_model()

def generate_otp():
    return str(random.randint(100000, 999999))


# Signup View


# @api_view(['POST'])
# def signup(request):
#     email = request.data.get('email')
#     fullname = request.data.get('fullname')
#     password = request.data.get('password')
#     role = request.data.get('role', 'student')
    
#     if not email or not password:
#         return JsonResponse({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
    
#     if User.objects.filter(email=email).exists():
#         return JsonResponse({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
#     otp = generate_otp()
#     cache.set(f'otp_{email}', {'otp': otp, 'fullname': fullname, 'password': password, 'role': role}, timeout=600)  # Store OTP for 10 minutes

#     send_mail('Your OTP Code', f'Your OTP is {otp}', 'Group-A-AITS@mail.com', [email])
#     return JsonResponse({'message': 'OTP sent to your email!'}, status=status.HTTP_201_CREATED)

# @api_view(['POST'])
# def login(request):
#     email = request.data.get('email')
#     password = request.data.get('password')
    
#     if not email or not password:
#         return JsonResponse(
#             {'error': 'Email and password are required'}, 
#             status=status.HTTP_400_BAD_REQUEST
#         )
        
#     try:
#         user = User.objects.get(email=email)
#     except User.DoesNotExist:
#         return JsonResponse(
#             {'error': 'Invalid email or password'}, 
#             status=status.HTTP_400_BAD_REQUEST
#         )
        
#     if not user.check_password(password):
#         return JsonResponse(
#             {'error': 'Invalid email or password'}, 
#             status=status.HTTP_400_BAD_REQUEST
#         )
        
#     refresh = RefreshToken.for_user(user)
    
#     return JsonResponse({
#         'access': str(refresh.access_token),
#         'refresh': str(refresh),
#         'role': user.role,
#         'fullname': user.fullname,
#         'email': user.email
#     }, status=status.HTTP_200_OK)
    
# @api_view(['POST'])
# def verify_otp(request):
#     email = request.data.get('email')
#     otp = request.data.get('otp')

#     if not email or not otp:
#         return JsonResponse({'error': 'Email and OTP are required'}, status=status.HTTP_400_BAD_REQUEST)
    
#     cached_data = cache.get(f'otp_{email}')
#     if not cached_data:
#         return JsonResponse({'error': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)
    
#     if cached_data['otp'] == otp:
#         # Create user after OTP verification
#         user = User.objects.create_user(
#             fullname=cached_data['fullname'], 
#             email=email, 
#             password=cached_data['password'], 
#             role=cached_data['role']
#         )
        
#         user.is_verified = True
#         user.save()
        
#         cache.delete(f'otp_{email}')  # Clear OTP data

#         refresh = RefreshToken.for_user(user)
#         return JsonResponse({'token': str(refresh.access_token), 'message': 'User created successfully!'}, status=status.HTTP_201_CREATED)

#     return JsonResponse({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signup(request):
    email = request.data.get('email')
    fullname = request.data.get('fullname')
    password = request.data.get('password')
    role = request.data.get('role', 'student')

    if not email or not password:
        return JsonResponse({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return JsonResponse({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)

    otp = generate_otp()
    cache.set(f'otp_{email}', {'otp': otp, 'fullname': fullname, 'password': password, 'role': role}, timeout=600)  # Store OTP for 10 minutes

    send_mail('Your OTP Code', f'Your OTP is {otp}', 'Group-A-AITS@mail.com', [email])
    return JsonResponse({'message': 'OTP sent to your email!'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return JsonResponse(
            {'error': 'Email and password are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return JsonResponse(
            {'error': 'Invalid email or password'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    if not user.check_password(password):
        return JsonResponse(
            {'error': 'Invalid email or password'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    refresh = RefreshToken.for_user(user)
    
    return JsonResponse({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'role': user.role,
        'fullname': user.fullname,
        'email': user.email
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def verify_otp(request):
    email = request.data.get('email')
    otp = request.data.get('otp')

    if not email or not otp:
        return JsonResponse({'error': 'Email and OTP are required'}, status=status.HTTP_400_BAD_REQUEST)

    cached_data = cache.get(f'otp_{email}')
    if not cached_data:
        return JsonResponse({'error': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)

    if cached_data['otp'] == otp:
        # Create user after OTP verification
        user = User.objects.create_user(
            fullname=cached_data['fullname'], 
            email=email, 
            password=cached_data['password'], 
            role=cached_data['role']
        )
        user.is_verified = True
        user.save()

        cache.delete(f'otp_{email}')  # Clear OTP data

        refresh = RefreshToken.for_user(user)
        return JsonResponse({'token': str(refresh.access_token), 'message': 'User created successfully!'}, status=status.HTTP_201_CREATED)

    return JsonResponse({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

# Resend OTP View
@api_view(['POST'])
def resend_otp(request):
    email = request.data.get('email')
    if not email:
        return JsonResponse({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.filter(email=email).first()
    if not user:
        return JsonResponse({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    cached_data = cache.get(f'otp_{email}')
    if not cached_data:
        return JsonResponse({'error': 'No signup request found. Please signup again.'}, status=404)
    
    new_otp = generate_otp()
    cached_data['otp'] = new_otp
    cache.set(f'otp_{email}', cached_data, timeout=600)
    # user.otp_created_at = timezone.now()  # Reset the OTP timestamp
    # user.save()
    send_mail('Your OTP Code', f'Your OTP is {new_otp}', 'AITS@mail.com', [email])
    return JsonResponse({'message': 'OTP resent successfully!'}, status=status.HTTP_200_OK)

    
class DepartmentView(generics.ListCreateAPIView):
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated, IsRegistrar]

    def get_queryset(self):
        return Department.objects.all()

    def perform_create(self, serializer):
        serializer.save()
    

class IssueView(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated]
    

class CourseView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsRegistrar]
    serializer_class = CourseSerializer
    
    def get_queryset(self):
        return Course.objects.all().select_related('department')
    
    def perform_create(self, serializer):
        department = serializer.validated_data.get('department')
        if not Department.objects.filter(id=department.id).exists():
            raise serializer.ValidationError("Department does not exist")
        serializer.save()
    
class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated, IsRegistrar]
    
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
        
# Assign Issue View (Only accessible by registrars)
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsRegistrar])  # Only registrars can assign issues
def assign_issue(request, issue_id, lecturer_id):
    issue = get_object_or_404(Issue, id=issue_id)
    lecturer = get_object_or_404(Lecturer, id=lecturer_id)
    
    if issue.course and lecturer.department != issue.course.department:
        return JsonResponse({'error': 'Lecturer must belong to the same department as the course'}, status=status.HTTP_400_BAD_REQUEST)
    
    issue.assign_to_lecturer(request.user, lecturer)
    issue.assigned_at = timezone.now()
    issue.save()
    return JsonResponse({'message': 'Issue assigned successfully'})

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
        return JsonResponse({'message': 'Issue resolved successfully'})
    
    return JsonResponse({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

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
        return JsonResponse(user_data, status=status.HTTP_200_OK)
# User Edit View (Accessible by authenticated users)
class UserEditView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserUpdateSerializer
    
    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return response
    
class LecturerView(generics.ListCreateAPIView):
    serializer_class = LecturerSerializer
    permission_classes = [IsAuthenticated, IsRegistrar]
    
    def get_queryset(self):
        # Only show issues assigned to the current lecturer
        return Issue.objects.filter(assigned_to=self.request.user)

class LecturerIssuesView(generics.ListAPIView):
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated, IsLecturer]

    def get_queryset(self):
        # Only show issues assigned to the current lecturer
        return Issue.objects.filter(assigned_to=self.request.user)

    
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # Ensure the refresh token is properly formatted
        if 'refresh' not in request.data:
            return Response(
                {'error': 'Refresh token is required'},
                status=status.HTTP_400_BAD_REQUEST
            )  
            
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            # Add any additional processing here if needed
            pass
            
        return response

               