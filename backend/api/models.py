
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import BaseUserManager
from django.utils import timezone
import datetime

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """
        Create and return a regular user with an email and password.
        """
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

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
    email = models.EmailField(unique=True)
    password2= models.CharField(max_length=20)
    Role = models.CharField(max_length=40,choices=ROLE_CHOICES,default='Student')
    Gender = models.CharField(max_length=20,choices=GENDER,editable=True)
    image = models.ImageField(upload_to='images/',null=True,blank=True)
    program = models.ForeignKey('Program', on_delete=models.CASCADE,related_name='programs',null = True,blank=True)
    year_of_study = models.CharField(max_length=20,choices=YEAR_CHOICES,null=True,editable=True)


    def __str__(self):
        return self.fullname
    
class Department(models.Model):  
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.code} - {self.name}"

class Course(models.Model):  
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.code} - {self.name}"   

class Lecturer(CustomUser):
    staff_id = models.CharField(max_length=20, unique=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    courses = models.ManyToManyField(Course)
    office_location = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        self.role = 'lecturer'  
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.staff_id} - {self.first_name} {self.last_name}" 

class Student(CustomUser): 
    student_id = models.CharField(max_length=20, unique=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    enrolled_courses = models.ManyToManyField(Course, blank=True)
    enrollment_date = models.DateField()

    def save(self, *args, **kwargs):
        self.role = 'student'
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.student_id} - {self.first_name} {self.last_name}" 
    
class Registrar(CustomUser):  
    staff_id = models.CharField(max_length=20, unique=True)
    office_number = models.CharField(max_length=20)

    def save(self, *args, **kwargs):
        self.role = 'registrar' 
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.staff_id} - {self.first_name} {self.last_name}"     

class Issue(models.Model):
    ISSUE_STATUS = (
        ('open', 'Open'),
        ('assigned', 'Assigned'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    )

    ISSUE_CHOICES = (('missing_marks','MISSING MARKS'),
                     ('appeal','APPEAL'),
                     ('correction','CORRECTION'))
    
    SEMESTER_CHOICES = [('Semester 1','SEMESTER 1'),
                        ('Semester 2','SEMESTER 2')]
    
    student = models.ForeignKey(CustomUser,on_delete=models.SET_NULL,null=True,related_name='issues', limit_choices_to={'Role':'Student'})
    semester = models.CharField(max_length=30, null = False,default='Semester 1')
    issue_type = models.CharField(max_length=50,choices=ISSUE_CHOICES)
    issue_status = models.CharField(max_length=50,choices=STATUS_CHOICES,default='Pending')
    
    course_unit = models.ForeignKey(CourseUnit,on_delete=models.CASCADE,null=True)
    issue_description = models.TextField()
    Image = models.ImageField(upload_to='images/',null=True,blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    lecturer = models.ForeignKey(CustomUser,on_delete=models.SET_NULL,null=True,related_name='lecturer_issues',limit_choices_to={'Role':'Lecturer'})
    registrar = models.ForeignKey(CustomUser,on_delete=models.SET_NULL,null=True,related_name='registrar_issues',limit_choices_to={'Role':'Academic_registrar'})
    
    class Meta:
        ordering = ['-created_at']



