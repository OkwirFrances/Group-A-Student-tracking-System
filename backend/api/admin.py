from django.contrib import admin
from .models import CustomUser,Department, Issue, Course, Lecturer, Student, Registrar
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email','fullname','role', 'is_verified', 'is_staff', 'is_active')
    
admin.site.register(CustomUser)
admin.site.register(Department)
admin.site.register(Issue)

