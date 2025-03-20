from django.urls import path,include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .views import *
from .views import get_course_units , get_users_by_role

router = DefaultRouter()
router.register(r'users',UserView)

router.register(r'departments',DepartmentView)

router.register(r'issues',IssueView)

router.register(r'course_units',CourseUnitView)

router.register(r'programs',ProgramView)

urlpatterns = [
    path('',include(router.urls)),
    path('api/users/', get_users_by_role, name = 'get_users_by_role'),
    path('api/users/', get_course_units, name = 'get_course_units'),
    path('issues/',IssueListView.as_view(),name = 'issue_list'),
    path('signup/',SignUpView.as_view(),name = 'signup'),
    path('access_token/',TokenObtainPairView.as_view(),name = 'access_token'),
    path('refresh_token/',TokenRefreshView.as_view(),name = 'refresh_token')
]
