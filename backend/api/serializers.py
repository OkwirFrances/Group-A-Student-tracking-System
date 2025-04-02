from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'fullname', 'role', 'is_verified', 'first_name', 'last_name', 'phone_number', 'profile_picture', 'termsAccepted']

  

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class LecturerSerializer(UserSerializer):
        department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())
        courses = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), many=True, required=False)
        password = serializers.CharField(write_only=True)
        staff_id = serializers.CharField(max_length=20)
        office_location = serializers.CharField(max_length=100)

class Meta:
    model = Lecturer
    fields = UserSerializer.Meta.fields + [
    'staff_id', 'department', 'courses', 'office_location', 'password'
        ]
    extra_kwargs = {
            'password': {'write_only': True},
            'role': {'read_only': True}
        }

    def create(self, validated_data):
        # This will be handled in the view's perform_create
        pass

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
        fields = ['id', 'name', 'code']

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


