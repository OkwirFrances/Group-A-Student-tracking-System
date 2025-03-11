from django.shortcuts import render
from rest_framework import viewsets
from .models import *   
from .serializers import *



# Create your views here.
class UserView(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer 
    