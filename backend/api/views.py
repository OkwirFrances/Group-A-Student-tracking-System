import random
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
 

User = get_user_model()


def generate_otp():
    return str(random.randint(100000, 999999))


@api_view(['POST'])
def signup(request):
    email = request.data.get('email')
    password = request.data.get('password')
    fullname = request.data.get('fullname')
    role = request.data.get('role', 'student')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(fullname=fullname, email=email, password=password, role=role)
    user.otp = generate_otp()
    user.otp_created_at = timezone.now()  # Store OTP timestamp
    user.save()

    send_mail('Your OTP Code', f'Your OTP is {user.otp}', 'admin@example.com', [email])
    return Response({'message': 'OTP sent to your email!'}, status=status.HTTP_201_CREATED)

    
class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            password = validated_data.pop('password')
            user = CustomUser(**validated_data)
            user.set_password(password)
            user.save()
            return Response({
                'message':'User created successfully',
                'username':serializer.validated_data['username']
                })
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
    
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