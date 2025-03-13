from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewset, DepartmentViewset, CourseUnitViewset, ProgramViewset, IssueViewset


router = DefaultRouter()
router.register(r'CustomUser',CustomUserViewset)
router.register(r'department',DepartmentViewset)
router.register(r'CourseUnit',CourseUnitViewset)
router.register(r'Program',ProgramViewset)
router.register(r'Issue',IssueViewset)

urlpatterns=[
    path('',include(router.urls)),

    

]

