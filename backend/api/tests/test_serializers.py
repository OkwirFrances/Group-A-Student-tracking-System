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
