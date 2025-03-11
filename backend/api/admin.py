from django.contrib import admin
from .models import CustomUser,Department, Issue, CourseUnit

admin.site.register(CustomUser)
admin.site.register(Department)
admin.site.register(Issue)
admin.site.register(CourseUnit)
# Register your models here.

