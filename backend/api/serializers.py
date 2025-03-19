from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *
from django.contrib.auth import authenticate

class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','first_name','last_name','email','password','image','Role','year_of_study','Gender']

class RegisterSerializer(ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ['email','password','username']
    def validate(self, data):
              
        if CustomUser.objects.filter(email = data.get('email')).exists():
            raise serializers.ValidationError("Email already taken....")
        return data
       
    def create(self , validated_data):
        user = CustomUser.objects.create_user(username=validated_data['username'],email = validated_data['email'],password = validated_data['password'])
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


class LoginSerializer(ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['email', 'password']

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        user = authenticate(email=email, password=password)
        if not user:
            raise serializers.ValidationError("Invalid Credentials")
        
        data['user'] = user
        return data

