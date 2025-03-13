from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'users',UserView)

router.register(r'departments',DepartmentView)

router.register(r'issues',IssueView)

router.register(r'course_units',CourseUnitView)

router.register(r'programs',ProgramView)

urlpatterns = [
    path('',include(router.urls)),
    
    path('register_user/',RegisterView.as_view()),
]
