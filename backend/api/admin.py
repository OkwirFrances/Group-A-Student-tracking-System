from django.contrib import admin
from .models import CustomUser,Department, Issue, CourseUnit, Program

admin.site.register(CustomUser)
admin.site.register(Department)
admin.site.register(Issue)
admin.site.register(CourseUnit)
admin.site.register(Program)
# Register your models here.

