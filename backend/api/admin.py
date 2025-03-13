from django.contrib import admin
from .models import CustomUser, Department, Program, Issue, CourseUnit

# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'Role', 'Gender', 'program', 'year_of_study')
    search_fields = ('username', 'email', 'first_name', 'last_name')

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'department_name', 'description')
    search_fields = ('department_name',)

@admin.register(CourseUnit)
class CourseUnitAdmin(admin.ModelAdmin):
    list_display = ('id', 'course_unit_name', 'course_unit_code')
    search_fields = ('course_unit_name', 'course_unit_code')

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ('id', 'program_name')
    filter_horizontal = ('course_units',)  # filter_horizontal used for many-to-many fields
    search_fields = ('program_name',)

@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'issue_type', 'issue_status', 'course_unit', 'date_created')
    list_filter = ('issue_type', 'issue_status', 'course_unit')
    search_fields = ('student__username', 'issue_type')