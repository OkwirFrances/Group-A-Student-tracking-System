from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import *   
from .serializers import *
from django.http import JsonResponse
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


# Create your views here.
class UserView(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer 
    
class DepartmentView(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class IssueView(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

class CourseUnitView(viewsets.ModelViewSet):
    queryset = CourseUnit.objects.all()
    serializer_class = CourseUnitSerializer

class ProgramView(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

                
               