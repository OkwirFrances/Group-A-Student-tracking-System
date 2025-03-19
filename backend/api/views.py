from django.shortcuts import render
from rest_framework import viewsets
from .models import *   
from .serializers import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny 



# Create your views here.
class UserView(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer 
    
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


class LoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self,request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email,password=password)
            if user:
                return Response({
                    'message':'Login successful',},status=status.HTTP_200_OK)
                    
                    
            return Response({
                'message':'Invalid credentials' },status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
               