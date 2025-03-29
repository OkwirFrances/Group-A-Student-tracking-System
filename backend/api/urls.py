from django.urls import path
from .views import signup, verify_otp, login, resend_otp, DepartmentView, CourseView, IssueView, assign_issue, resolve_issue, UserInfoView, UserEditView


urlpatterns = [
    path('',include(router.urls)),
    
    path('login/',TokenObtainPairView.as_view(),name = 'login'),
    path('refresh_token/',TokenRefreshView.as_view(),name = 'refresh_token'),
    
]
