from rest_framework.serializers import ModelSerializer
from .models import *

class customuserseriaizer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','first_name','last_name','email','role','year_of_study']

class Departmentserializer(ModelSerializer):
    class Meta:
        model = Department
        fields = ['department_name','description']

class Issueserializer(ModelSerializer):
    class Meta:
        model = Issue
        fields = ['student','issue_type','issue_status','course_unit','issue_description','Image','date_created','update','lecturer','registrar']

class CourseUnitserializer(ModelSerializer):
    class Meta:
        model = CourseUnit
        fields = ['course_unit_name','course_unit_code']

