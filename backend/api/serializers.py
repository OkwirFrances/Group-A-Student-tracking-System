from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *
from django.core.exceptions import ValidationError
from .models import User, Department, Course, Lecturer, Student, Registrar, Issue

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'fullname', 'role', 'is_verified', 'first_name', 'last_name', 'phone_number', 'profile_picture', 'terms_accepted']

class LecturerSerializer(UserSerializer):
    department = serializers.StringRelatedField()
    courses = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), many=True)

    class Meta:
        model = CustomUser
        fields = ['full_name','email','password','confirm_password','term_accepted']


class RegisterSerializer(ModelSerializer):
    password2 = serializers.CharField(write_only = True)
    
    class Meta:
        model = CustomUser
        fields = ['first_name','last_name','username','email','password', 'password2']

    def validate(self, data):
        
        if CustomUser.objects.filter(username = data.get('username')).exists():
            raise serializers.ValidationError("Username already exists")
        
        if CustomUser.objects.filter(email = data.get('email')).exists():
            raise serializers.ValidationError("Email already taken....")
    
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords should match")
        return data
    
    def create(self , validated_data):
        validated_data.pop('confirm_password')
        user = CustomUser.objects.create_user(username=validated_data['username'], email=validated_data['email'], password=validated_data['password'], term_accepted=validated_data['term_accepted'])

        return user


class DepartmentSerializer(ModelSerializer):
    class Meta:
        model = Department
        fields = ['department_name','description']

class IssueSerializer(ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'
        #fields = ['student','issue_type','issue_status','course_unit','issue_description','Image','date_created','update','lecturer','registrar']

class CourseUnitSerializer(ModelSerializer):
    class Meta:
        model = CourseUnit
        fields = ['course_unit_name','course_unit_code'] 

class ProgramSerializer(ModelSerializer):
    class Meta:
        model = Program
        fields = ['program_name','course_units']

