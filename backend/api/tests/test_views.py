# API endpoints tests

from rest_framework.test import APITestCase
from django.urls import reverse
from api.models import Department, CustomUser
from rest_framework import status

class DepartmentViewTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email='registrar@example.com',
            password='StrongPass123!',
            fullname='Registrar',
            role='registrar',
            is_verified=True
        )
        self.client.force_authenticate(user=self.user)
        
        
    def test_create_department(self): 
        response = self.client.post('/departments/', {
            'name': 'Engineering',
            'code': 'ENG'
        })   