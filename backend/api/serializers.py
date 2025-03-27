from rest_framework import serializers
from .models import Department, Course, Lecturer, Student, Registrar, Issue
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'fullname', 'role', 'is_verified', 'first_name', 'last_name', 'phone_number', 'profile_picture', 'termsAccepted']

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
        fields = [
            'id', 'student', 'issue_type', 'semester', 'course', 'title', 'description', 
            'status', 'created_at', 'updated_at', 'assigned_to', 'assigned_by', 
            'assigned_at', 'resolved_by', 'resolved_at'
        ]

    def create(self, validated_data):
        student = self.context['request'].user
        validated_data['student'] = student
        return super().create(validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr not in ['assigned_to', 'assigned_by', 'resolved_by']:
                setattr(instance, attr, value)
        instance.save()
        return instance


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['fullname', 'phone_number', 'profile_picture'] 
    
    def update(self, instance, validated_data):
        instance.fullname = validated_data.get('fullname', instance.fullname)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.profile_picture = validated_data.get('profile_picture', instance.profile_picture)
        instance.save()
        return instance