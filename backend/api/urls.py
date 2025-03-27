from django.urls import path
from .views import signup, verify_otp, login, resend_otp, DepartmentView, CourseView, IssueView, assign_issue, resolve_issue, UserInfoView, UserEditView


urlpatterns = [
    path('signup/', signup),
    path('verify-otp/', verify_otp),
    path('login/', login),
    path('resend-otp/', resend_otp),
    path('departments/', DepartmentView.as_view(), name='department-list-create'),
    path('courses/', CourseView.as_view(), name='course-list-create'),
    path('issues/', IssueView.as_view(), name='issue-list-create'),
    path('issues/<int:pk>/', IssueView.as_view(), name='issue-detail'),
    path('issues/<int:issue_id>/assign/<int:lecturer_id>/', assign_issue, name='assign-issue'),
    path('issues/<int:issue_id>/resolve/', resolve_issue, name='resolve-issue'),
    path('user-info/', UserInfoView.as_view(), name='user-info'),
    path('user-info/edit/', UserEditView.as_view(), name='user-edit'),
]
