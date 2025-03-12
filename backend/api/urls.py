from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'users',UserView)

router = DefaultRouter()
router.register(r'departments',DepartmentView)

urlpatterns = [
    path('',include(router.urls)),
    path('register_user/',RegisterView.as_view()),
]
