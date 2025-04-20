# API endpoints tests

from rest_framework.test import APITestCase
from django.urls import reverse
from api.models import Department, CustomUser
from rest_framework import status

class DepartmentViewTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email='registrar@example.com',