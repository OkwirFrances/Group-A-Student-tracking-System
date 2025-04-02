from rest_framework import viewsets
from django.core.mail import send_mail
from rest_framework import status, generics
from rest_framework.response import Response
from django.utils import timezone
from .models import *   
from .serializers import *
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
from django.shortcuts import get_list_or_404
import random


User = get_user_model()

def generate_otp():
    return str(random.randint(100000, 999999))


# Signup View
from django.core.cache import cache  # Import Django cache

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
    
    user.otp = generate_otp()
    user.otp_created_at = timezone.now()  # Reset the OTP timestamp
    user.save()
    send_mail('Your OTP Code', f'Your OTP is {user.otp}', 'AITS@mail.com', [email])
    return JsonResponse({'message': 'OTP resent successfully!'}, status=status.HTTP_200_OK)


    
# Create your views here.
class UserView(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer 
    
class DepartmentView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsRegistrar]
    serializer_class = DepartmentSerializer
    
    def get_queryset(self):
        return Department.objects.all()
    
    def perform_create(self, serializer):
        serializer.save()
    

class IssueView(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

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

class ProgramView(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

                
               