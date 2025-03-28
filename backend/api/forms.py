from django import forms
from.models import Issue , CustomUser , CourseUnit

class IssueForm(forms.ModelForm):
    class Meta:
        model = Issue
        fields = '__all__'
        
def __init__(self, *args, **kwargs):
    super().__init__(*args,**kwargs)
    
    self.fields['student'].queryset = CustomUser.objects.filter(Role = 'Student')
    self.fields['lecturer'].queryset = CustomUser.objects.filter(Role = 'Lecturer')
    self.fields['registrar'].queryset = CustomUser.objects.filter(Role = 'Academic_Registrar')
    
    self.fields['course_unit'].queryset = CourseUnit.objects.all()