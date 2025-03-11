from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class CustomUser(AbstractUser):
    ROLE_CHOICES = [( 'Student','STUDENT'), 
                    ('Lecturer', 'LECTURER'),
                 ('Academic_registrar','ACADEMIC REGISTRAR')]
    
    GENDER = [('Male','MALE'),
              ('Female','FEMALE')]
    
    YEAR_CHOICES = [('YEAR 1','YEAR 1'),
            ('YEAR_2','YEAR 2'),
            ('YEAR_3','YEAR 3'),
            ('YEAR_4','YEAR 4'),
            ('YEAR_5','YEAR 5')]    
    
    Role = models.CharField(max_length=40,choices=ROLE_CHOICES,default='student')
    Gender = models.CharField(max_length=20,choices=GENDER,editable=True)
    year_of_study = models.CharField(max_length=20,choices=YEAR_CHOICES,null=True,editable=True)


    def __str__(self):
        return self.username

class Department(models.Model):
    department_name = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return self.department_name
    
class Issue(models.Model):
    STATUS_CHOICES = [('Pending','PENDING'),
                      ('Resolved','RESOLVED'),
                      ('In Progress','IN PROGRESS')]
    
    ISSUE_CHOICES = [('missing_marks','MISSING MARKS'),
                     ('appeal','APPEAL'),
                     ('correction','CORRECTION')]
    
    student = models.ForeignKey(CustomUser,on_delete=models.SET_NULL,null=True),related_name='issues', limit_choices_to={'Role':'Student'}
    issue_type = models.CharField(max_length=50,choices=ISSUE_CHOICES)
    issue_status = models.CharField(max_length=50,choices=STATUS_CHOICES,default='Pending')
    course_unit = models.ForeignKey('CourseUnit',on_delete=models.SET_NULL,null=True)
    issue_description = models.TextField()
    Image = models.ImageField(upload_to='images/',null=True,blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    lecturer = models.ForeignKey(CustomUser,on_delete=models.SET_NULL,null=True,related_name='lecturer_issues',limit_choices_to={'Role':'Lecturer'})
    registrar = models.ForeignKey(CustomUser,on_delete=models.SET_NULL,null=True,related_name='registrar_issues',limit_choices_to={'Role':'Academic_registrar'})
    
    class Meta:
        ordering = ['update','date_created']

    def __str__(self):
        return self.issue_type



