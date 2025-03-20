from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *
from django.contrib.auth import authenticate

class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','first_name','last_name','email','password','image','Role','year_of_study','Gender']

  

class DepartmentSerializer(ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class IssueSerializer(ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'
        #fields = ['student','issue_type','issue_status','course_unit','issue_description','Image','date_created','update','lecturer','registrar']

class CourseUnitSerializer(ModelSerializer):
    class Meta:
        model = CourseUnit
        fields = '__all__' 

class ProgramSerializer(ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'


