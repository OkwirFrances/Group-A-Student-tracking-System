# serializer validation tests

from rest_framework.test import APITestCase
from api.serializers import UserSerializer, IssueSerializer
from api.models import CustomUser, Department, Course, Issue
