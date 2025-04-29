# model logic and validation tests

from django.test import TestCase
from api.models import CustomUser, Department, Course, Issue, Student

class CustomUserModelTest(TestCase):
    def test_user_creation(self):
        user = CustomUser.objects.create_user(
            email='test@example.com',
            password='TestPassword123!',
            fullname='Test User',
            role='student'
        )
        self.assertEqual(user.email, 'test@example.com')
        self.assertTrue(user.check_password('TestPassword123!'))
        

class DepartmentModelTest(TestCase):
    def test_department_str(self):
        dept = Department.objects.create(code='CS', name='Computer Science')
        self.assertEqual(str(dept), 'CS - Computer Science')
        
