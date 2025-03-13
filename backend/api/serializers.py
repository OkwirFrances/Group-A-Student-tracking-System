from rest_framework import serializers
from .models import CustomUser, Department, CourseUnit, Program, Issue  

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'Role', 'department', 'program', 'year_of_study', 'password']
        extra_kwags = {'password': {'write_only': True, 'required': True}} #specifies additional keyword arguments for the password field.
       #This is important for security reasons, so that passwords are not exposed in API responses
        # The write_only flag is set to True so that the password is not included in the serialized output.
        # The required flag is set to True so that the password field is required when data is deserialized.

    def create (self,validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
    

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class CourseUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseUnit
        fields = '__all__'

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'

