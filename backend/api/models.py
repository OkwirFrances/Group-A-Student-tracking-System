
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
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    ROLE_CHOICES = [( 'Student','STUDENT'), 
                    ('Lecturer', 'LECTURER'),
                 ('Academic_registrar','ACADEMIC REGISTRAR')]
    
    GENDER = [('Male','MALE'),
              ('Female','FEMALE')]
     
    username = None
    email = models.EmailField(unique=True)
    fullname = models.CharField(max_length=100, null=False)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)  
    otp = models.CharField(max_length=6, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    otp_created_at = models.DateTimeField(null=True, blank=True)
    Role = models.CharField(max_length=40,choices=ROLE_CHOICES,default='Student')
    Gender = models.CharField(max_length=20,choices=GENDER,editable=True)
    phone_number = models.CharField(max_length=20, blank=True)
    image = models.ImageField(upload_to='images/',null=True,blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True)   
    program = models.ForeignKey('Program', on_delete=models.CASCADE,related_name='programs',null = True,blank=True)
    year_of_study = models.CharField(max_length=20,choices=YEAR_CHOICES,null=True,editable=True)
    termsAccepted = models.BooleanField(default=False)
    
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fullname','role']
    
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
                        ('Semester 2','SEMESTER 2'),
                        ('Semester 3','SEMESTER 3'),
                        ('Semester 4','SEMESTER 4'),]
    
    student = models.ForeignKey(CustomUser,on_delete=models.SET_NULL,null=True,related_name='issues', limit_choices_to={'Role':'Student'})
    semester = models.CharField(max_length=30, null = False,default='Semester 1')
    issue_type = models.CharField(max_length=50,choices=ISSUE_CHOICES)
    semester = models.CharField(max_length=50,choices=SEMESTER_CHOICES)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True)
    Image = models.ImageField(upload_to='images/',null=True,blank=True)
    description = models.TextField()
    status = models.CharField(max_length=50,choices=ISSUE_STATUS,default='open')
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(default=datetime.datetime.now)
    updated_at = models.DateTimeField(auto_now=True)
    assigned_to = models.ForeignKey(Lecturer, on_delete=models.SET_NULL,  null=True,  blank=True, related_name='assigned_issues')
    registrar = models.ForeignKey(CustomUser,on_delete=models.SET_NULL,null=True,related_name='registrar_issues',limit_choices_to={'Role':'Academic_registrar'})
    assigned_by = models.ForeignKey(Registrar, on_delete=models.SET_NULL,  null=True, blank=True,related_name='assigned_issues')
    resolved_by = models.ForeignKey(Registrar,on_delete=models.SET_NULL,null=True,blank=True,related_name='resolved_issues')
    assigned_at = models.DateTimeField(null=True, blank=True)
    resolved_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']
        
        
        def __str__(self):
         return f"Issue #{self.id} - {self.title}"
