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

