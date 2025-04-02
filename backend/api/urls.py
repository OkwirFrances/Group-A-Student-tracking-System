from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .views import (signup, verify_otp, login, resend_otp, DepartmentView, CourseView, 
    IssueView, assign_issue, resolve_issue, UserInfoView, UserEditView,
    LecturerView, LecturerIssuesView, CourseDetailView, CustomTokenRefreshView  # Add these new views
)



router = DefaultRouter()
router.register(r'users',UserView)

router.register(r'departments',DepartmentView)

router.register(r'issues',IssueView)

router.register(r'course_units',CourseUnitView)

router.register(r'programs',ProgramView)

urlpatterns = [
    path('',include(router.urls)),
    
    path('login/',TokenObtainPairView.as_view(),name = 'login'),
    path('refresh_token/',TokenRefreshView.as_view(),name = 'refresh_token'),
    
]