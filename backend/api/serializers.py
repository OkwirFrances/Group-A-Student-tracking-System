from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError


CustomUser = get_user_model()


class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','first_name','last_name','email','password','image','Role','year_of_study','Gender']

class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['full_name','email','password','confirm_password','terms_accepted']
        
    def validate(self, data):
        
        # checks if passwords  match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        
        # check if terms and conditions have been accepted
        if not data.get('terms_accepted'):
            raise serializers.ValidationError("You must accept the terms and conditions")
        
        # checks if email already exists
        if CustomUser.objects.filter(email = data.get('email')).exists():
            raise serializers.ValidationError("Email already used....")
        
        
        return data
    
    def create(self , validated_data):
        
        user = CustomUser.objects.create_user(username=validated_data['username'], email=validated_data['email'], password=validated_data['password'],terms_accepted=validated_data['terms_accepted'])

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

