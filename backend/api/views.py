from django.shortcuts import render
from rest_framework import viewsets
from .models import *   
from .serializers import *
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status



# Create your views here.
class UserView(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer 
    
class RegisterView(APIView):
    def post(self,request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message':'User created successfully',
                'username':serializer.validated_data['username']
                })
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class DepartmentView(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer