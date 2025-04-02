from django.contrib import admin
from .models import CustomUser,Department, Issue, Course, Lecturer, Student, Registrar
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email','fullname','role', 'is_verified', 'is_staff', 'is_active')
    list_filter = ('role', 'is_verified', 'is_staff', 'is_active')
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('fullname', 'phone_number', 'profile_picture')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Verification', {'fields': ('otp', 'is_verified')}),
    )
    
admin.site.register(CustomUser)
admin.site.register(Department)
admin.site.register(Issue)

