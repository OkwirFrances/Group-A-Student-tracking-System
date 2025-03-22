
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

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and return a superuser with an email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    username = None  # Removing the username field
    email = models.EmailField(unique=True)
    fullname = models.CharField(max_length=255, null=False)
    otp = models.CharField(max_length=6, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    otp_created_at = models.DateTimeField(null=True, blank=True)
    first_name = models.CharField(max_length=30, blank=True)  # Added first_name field
    last_name = models.CharField(max_length=30, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True) 
    
    
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('lecturer', 'Lecturer'),
        ('registrar', 'Registrar'),
    ]
    
    
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='student')
    
   
    terms_accepted = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'role'] 
    
    
    objects = CustomUserManager() 

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

class Lecturer(User):
    staff_id = models.CharField(max_length=20, unique=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    courses = models.ManyToManyField(Course)
    office_location = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        self.role = 'lecturer'  
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.staff_id} - {self.first_name} {self.last_name}" 

class Student(User): 
    student_id = models.CharField(max_length=20, unique=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    enrolled_courses = models.ManyToManyField(Course, blank=True)
    enrollment_date = models.DateField()

    def save(self, *args, **kwargs):
        self.role = 'student'
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.student_id} - {self.first_name} {self.last_name}" 

class Program(models.Model):
    program_name = models.CharField(max_length=100)
    course_units = models.ManyToManyField(CourseUnit, related_name="course_units")


class Issue(models.Model):
    STATUS_CHOICES = [('Pending','PENDING'),
                      ('Resolved','RESOLVED'),
                      ('In Progress','IN PROGRESS')]
    
    ISSUE_CHOICES = [('missing_marks','MISSING MARKS'),
                     ('appeal','APPEAL'),
                     ('correction','CORRECTION')]
    
    SEMESTER_CHOICES = [('Semester 1','SEMESTER 1'),
                        ('Semester 2','SEMESTER 2')]
    
    student = models.ForeignKey(CustomUser,on_delete=models.SET_NULL,null=True,related_name='issues', limit_choices_to={'Role':'Student'})
    semester = models.CharField(max_length=30, null = False,default='Semester 1')
    issue_type = models.CharField(max_length=50,choices=ISSUE_CHOICES)
    issue_status = models.CharField(max_length=50,choices=STATUS_CHOICES,default='Pending')
    
    course_unit = models.ForeignKey(CourseUnit,on_delete=models.CASCADE,null=True)
    issue_description = models.TextField(validators=[MaxLengthValidator(500)],help_text='Describe the issue in not more than 500 characters')
    Image = models.ImageField(upload_to='images/',null=True,blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    lecturer = models.ForeignKey(CustomUser,on_delete=models.SET_NULL,null=True,related_name='lecturer_issues',limit_choices_to={'Role':'Lecturer'})
    registrar = models.ForeignKey(CustomUser,on_delete=models.SET_NULL,null=True,related_name='registrar_issues',limit_choices_to={'Role':'Academic_registrar'})
    
    class Meta:
        ordering = ['update','date_created']

    def __str__(self):
        return self.issue_type



