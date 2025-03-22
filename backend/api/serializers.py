from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *
from django.core.exceptions import ValidationError
from .models import User, Department, Course, Lecturer, Student, Registrar, Issue
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'fullname', 'role', 'is_verified', 'first_name', 'last_name', 'phone_number', 'profile_picture', 'terms_accepted']

class LecturerSerializer(UserSerializer):
    department = serializers.StringRelatedField()
    courses = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), many=True)

    class Meta:
        model = Lecturer
        fields = UserSerializer.Meta.fields + ['staff_id', 'department', 'courses', 'office_location']

class StudentSerializer(UserSerializer):
    department = serializers.StringRelatedField()
    enrolled_courses = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), many=True)

    class Meta:
        model = Student
        fields = UserSerializer.Meta.fields + ['student_id', 'department', 'enrolled_courses', 'enrollment_date']

class RegistrarSerializer(UserSerializer):
    staff_id = serializers.CharField(max_length=20)
    office_number = serializers.CharField(max_length=20)

    class Meta:
        model = Registrar
        fields = UserSerializer.Meta.fields + ['staff_id', 'office_number']

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'code', 'name', 'description']

class CourseSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()

    class Meta:
        model = Course
        fields = ['id', 'code', 'name', 'department', 'description']

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

