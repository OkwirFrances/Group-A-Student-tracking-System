from django.contrib import admin
from .models import CustomUser,Department, Issue, CourseUnit, Program

admin.site.register(CustomUser)
admin.site.register(Department)
admin.site.register(Issue)
admin.site.register(CourseUnit)
admin.site.register(Program)

class IssueAdmin(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        
        if db_field.name == 'student':
            kwargs['queryset'] = CustomUser.objects.filter(Role = 'Student')
            
        elif db_field.name == 'lecturer':
            kwargs['queryset'] = CustomUser.objects.filter(Role = 'Lecturer')
            
        elif db_field == 'registrar':
            kwargs['queryset'] = CustomUser.objects.filter(Role = 'Academic_Registrar')
            
            return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
                
        admin.site.register(Issue, IssueAdmin)

