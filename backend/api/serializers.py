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

        