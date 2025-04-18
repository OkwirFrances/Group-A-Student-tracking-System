from rest_framework.test import APITestCase
from django.urls import reverse
from django.core.cache import cache
from django.contrib.auth import get_user_model
from rest_framework import status

User = get_user_model()

class AuthTests(APITestCase):
    def setUp(self):
        self.signup_url = '/signup/'
        self.verify_url = '/verify-otp/'
        self.login_url = '/login/'
        self.resend_url = '/resend-otp/'
        
        self.test_email = "testuser@example.com"
        self.test_data = {
            "email": self.test_email,
            "fullname": "Test User",
            "password": "StrongPass123!",
            "role": "student"
        }