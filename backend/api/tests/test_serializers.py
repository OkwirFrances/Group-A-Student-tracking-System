# serializer validation tests

from rest_framework.test import APITestCase
from api.serializers import UserSerializer, IssueSerializer
from api.models import CustomUser, Department, Course, Issue

class UserSerializerTest(APITestCase):
    def test_user_serializer_valid(self):
        data = {
            "email": "student@example.com",
            "fullname": "Student User",
            "password": "StrongPass123!",
            "role": "student",
            "termsAccepted": True
        }
        serializer = UserSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        
        
class IssueSerializerTest(APITestCase):
    def setUp(self):
        self.department = Department.objects.create(code='CS', name='Comp Sci')
        self.course = Course.objects.create(code='CSC101', name='Intro', department=self.department)
        self.student = CustomUser.objects.create_user(email='s@x.com', password='testpass', fullname='Stu', role='student')
        
    def test_create_issue_serialization(self):
        issue_data = {
            "issue_type": "appeal",
            "semester": "Semester 1",
            "course": self.course.id,
            "title": "Test issue",
            "description": "Something is wrong",
            "status": "open"
        } 
        context = {"request": None}
        serializer = IssueSerializer(data=issue_data, context=context)
        self.assertTrue(serializer.is_valid())   
                      
        
