# from django.contrib.auth.models import AbstractUser
# from django.db import models

# class User(AbstractUser):
#     username = None
#     email = models.EmailField(unique=True)
#     otp = models.CharField(max_length=6, blank=True, null=True)
#     is_verified = models.BooleanField(default=False)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []


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
    
    # Role choices
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('lecturer', 'Lecturer'),
        ('registrar', 'Registrar'),
    ]
    
    # Setting default role as 'student'
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='student')
    
    # Terms acceptance
    terms_accepted = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'role'] 
    
     # Fields required for admin creation
    objects = CustomUserManager() 

    def __str__(self):
        return self.full_name
    
class Department(models.Model):  # Changed inheritance
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.code} - {self.name}"

class Course(models.Model):  # Changed inheritance
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.code} - {self.name}"        

class Lecturer(User):  # Updated inheritance
    staff_id = models.CharField(max_length=20, unique=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    courses = models.ManyToManyField(Course)
    office_location = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        self.role = 'lecturer'  # Ensure role is set to 'lecturer'
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.staff_id} - {self.first_name} {self.last_name}" 

class Student(User):  # Updated inheritance
    student_id = models.CharField(max_length=20, unique=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    enrolled_courses = models.ManyToManyField(Course, blank=True)
    enrollment_date = models.DateField()

    def save(self, *args, **kwargs):
        self.role = 'student'  # Ensure role is set to 'student'
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.student_id} - {self.first_name} {self.last_name}" 
     # Fixed get_full_name usage

class Registrar(User):  # Updated inheritance
    staff_id = models.CharField(max_length=20, unique=True)
    office_number = models.CharField(max_length=20)

    def save(self, *args, **kwargs):
        self.role = 'registrar'  # Ensure role is set to 'registrar'
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
    
    SEMESTER_CHOICES = (('Semester 1','SEMESTER 1'),
                        ('Semester 2','SEMESTER 2'))
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    issue_type = models.CharField(max_length=50,choices=ISSUE_CHOICES)
    semester = models.CharField(max_length=50,choices=SEMESTER_CHOICES)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=ISSUE_STATUS, default='open')
    created_at = models.DateTimeField(default=datetime.datetime.now)
    updated_at = models.DateTimeField(auto_now=True)
    assigned_to = models.ForeignKey(
        Lecturer, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='assigned_issues'
    )
    assigned_by = models.ForeignKey(
        Registrar, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='assigned_issues'
    )
    assigned_at = models.DateTimeField(null=True, blank=True)
    resolved_by = models.ForeignKey(
        Registrar,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='resolved_issues'
    )
    resolved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Issue #{self.id} - {self.title}"

    def assign_to_lecturer(self, registrar, lecturer):
        self.assigned_to = lecturer
        self.assigned_by = registrar
        self.assigned_at = timezone.now()
        self.status = 'assigned'
        self.save()

    def resolve_issue(self, registrar):
        self.resolved_by = registrar
        self.resolved_at = timezone.now()
        self.status = 'resolved'
        self.save()

    class Meta:
        ordering = ['-created_at']




