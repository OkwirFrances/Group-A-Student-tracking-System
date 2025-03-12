from rest_framework import serializers
from .models import CustomUser, Department, Issue,Audit_Trails

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        # exclude = ['id',]
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'  

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'            

class Audit_TrailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audit_Trails
        fields = '__all__'