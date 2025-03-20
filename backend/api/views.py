from django.shortcuts import render
from rest_framework import viewsets
from .models import *   
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny 
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated




def get_users_by_role(request, role):
    users = CustomUser.objects.filter(Role = role).values('id','full_name')
    return JsonResponse(list(users), safe=False)

def get_course_units(request):
    course_units = course_units.all().values('id','course_unit_name')
    return JsonResponse(list(course_units), safe=False)
    

class UserView(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer 

class SignUpView(APIView):
    permission_classes = [AllowAny]

    def post(self,request):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            password = validated_data.pop('password')
            user = CustomUser(**validated_data)
            user.set_password(password) 
            user.save()
            return Response({
                'message':'User created successfully',
                'username':user.username
                },status=status.HTTP_201_CREATED)
            
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
    
    
class IssueListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        issues = Issue.objects.all()
        serializer = IssueSerializer(issues, many=True)
        
        return Response(serializer.data, status=250)
    
class CreateIssueView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = IssueSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors,status==400)