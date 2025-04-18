from rest_framework.test import APITestCase
#from django.urls import reverse
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
        
        
    def test_signup_sends_otp(self):
        """Test user signup and OTP is cached"""
        response = self.client.post(self.signup_url, self.test_data)
        self.assertEqual(response.status_code, 201)
        self.assertIn("message", response.json())
        self.assertIsNotNone(cache.get(f"otp_{self.test_email}"))
        
    def test_verify_otp_creates_user(self):
        """Test OTP verification creates user and returns token"""
        self.client.post(self.signup_url, self.test_data)
        otp_info = cache.get(f"otp_{self.test_email}")
        otp = otp_info['otp']
        
        response = self.client.post(self.verify_url, {
            "email": self.test_email,
            "otp": otp
        })
        
        self.assertEqual(response.status_code, 201)
        self.assertIn("token", response.json())
        self.assertTrue(User.objects.filter(email=self.test_email).exists())
    
    def test_verify_otp_with_wrong_code_fails(self):
        """Test that wrong OTP fails"""
        self.client.post(self.signup_url, self.test_data)
        wrong_otp = '000000'
        
        response = self.client.post(self.verify_url, {
            "email": self.test_email,
            "otp": wrong_otp
        })
        
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.json())
        
    def test_verify_expired_otp_fails(self):
        """simulate expired OTP by clearing cache"""
        self.client.post(self.signup_url, self.test_data)
        cache.delete(f"otp_{self.test_email}")  # Simulate OTP expiration
        
        response = self.client.post(self.verify_url, {
            "email": self.test_email,
            "otp": "123456"
        })
        
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.json())
        
    def test_login_before_otp_verification_fails(self):
        """Unverified users should not be able to log in"""
        self.client.post(self.signup_url, self.test_data)

        response = self.client.post(self.login_url, {
            "email": self.test_email,
            "password": self.test_data['password']
        })    
        
    def test_login_with_correct_credentials(self):
        """Test successful login after signup and OTP verification"""
        self.client.post(self.signup_url, self.test_data)
        otp = cache.get(f"otp_{self.test_email}")['otp'] 
        self.client.post(self.verify_url, {"email": self.test_email, "otp": otp})

        response = self.client.post(self.login_url, {
            "email": self.test_email,
            "password": self.test_data['password']
        }) 
        
        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.json())
        self.assertIn("refresh", response.json())  
        
    def test_login_with_wrong_password_fails(self):
        """Login should fail with wrong password"""  
        self.client.post(self.signup_url, self.test_data)
        otp = cache.get(f"otp_{self.test_email}")['otp']
        self.client.post(self.verify_url, {"email": self.test_email, "otp": otp})
        
        response = self.client.post(self.login_url, {
            "email": self.test_email,
            "password": "WrongPassword123"
        }) 
        
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.json())
        
    def test_resend_otp(self):
        """Test OTP is regenerated and sent"""
        self.client.post(self.signup_url, self.test_data)
        response = self.client.post(self.resend_url, {"email": self.test_email})
        
        self.assertEqual(response.status_code, 200)
        self.assertIn("message", response.json())

            