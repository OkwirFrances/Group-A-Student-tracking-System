from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *
from django.contrib.auth import authenticate

class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'fullname', 'role', 'is_verified', 'first_name', 'last_name', 'phone_number', 'profile_picture', 'termsAccepted']

  

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class IssueSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    course = CourseSerializer(read_only=True)
    assigned_to = LecturerSerializer(read_only=True)
    assigned_by = RegistrarSerializer(read_only=True)
    resolved_by = RegistrarSerializer(read_only=True)
    
    issue_type = serializers.ChoiceField(choices=Issue.ISSUE_CHOICES)
    semester = serializers.ChoiceField(choices=Issue.SEMESTER_CHOICES)
    status = serializers.ChoiceField(choices=Issue.ISSUE_STATUS)
    
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


