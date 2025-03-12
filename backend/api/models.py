from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

#custom user model
class CustomUser(AbstractUser):
    Gender_Choices=[
        ('male', 'Male'),
        ('female','Female'),
    ]

    Role_Choices=[
        ('student','Student'),
        ('lecturer','Lecturer'),
        ('head_0f_department','Head_Of_Department'),
        ('academic_registrar','Academic_Registrar'),
    ]

    role = models.CharField(max_length=50, choices= Role_Choices, default= 'student')
    gender=models.CharField(max_length=10, choices=Gender_Choices,null=True,blank=True)
    year_of_study=models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.username
    

    #department model
class Department(models.Model):
        department_name=models.CharField(max_length=100,unique=True)
        code=models.CharField(max_length=50, unique=True)
        description=models.TextField()
        head_of_department = models.ForeignKey(CustomUser,on_delete=models.SET_NULL,null=True,blank=True,limit_choices_to={'Role':'lecturer'},related_name='head_of_departments')

        def __str__(self):
            return self.department_name
        

      #issues model
class Issue(models.Model):
    ISSUE_CHOICES = [
        ('correction','Correction'),
        ('missing_marks','Missing marks'),
        ('appeal','Appeal')
    ]
    student = models.ForeignKey(CustomUser,on_delete=models.SET_NULL,null = True, limit_choices_to={'role':'student'})
    issue_type = models.CharField(max_length=40, choices=ISSUE_CHOICES )
    department = models.ForeignKey(Department,on_delete=models.CASCADE, related_name='department_issues')
    course_unit_code = models.CharField(max_length=10)
    course_unit_name = models.CharField(max_length=80)
    description = models.TextField()
    supporting_document = models.FileField(upload_to='issue_documents',null=True,blank=True)

    STATUS_CHOICES=[
           ('pending','Pending'),
           ('in_progress','In_Progress'),
           ('resolved','Resolved'),
       ]
    
    status =models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    lecturer = models.ForeignKey(CustomUser, on_delete=models.PROTECT,null=True,related_name='issue_as_lecturer',limit_choices_to={'role':'lecturer'})
    academic_registrar = models.ForeignKey(CustomUser,on_delete=models.PROTECT, null=True,related_name='issue_as_academic_registrar', limit_choices_to={'role':'academic_registrar'})


    class Meta:
         ordering = ['updated_at','created_at',]

    def __str__(self):
         return self.issue_type

class Audit_Trails(models.Model):
     ACTION_CHOICES = [
          ('created','Created'),
          ('assigned','Assigned'),
          ('resolved','Resolved'),
          ('updated','Updated'),
          ('forwarded','Forwarded'),
          ('closed','Closed'),
     ]

     issue = models.ForeignKey(Issue, on_delete=models.CASCADE,related_name='audit_trails')
     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
     action = models.CharField(max_length=50,choices=ACTION_CHOICES, default='created')
     created_at = models.DateTimeField(auto_now_add=True)
     updated_at = models.DateTimeField(auto_now_add=True)
     comment = models.TextField(blank=True,null=True)
     previous_status = models.CharField(max_length=50,blank=True,null=True)
     new_status = models.CharField(max_length=50,blank=True,null=True)

     def __str__(self):
          return f"{self.user.username} on {self.issue} at {self.updated_at}"
     
     class Meta:
          ordering = ['updated_at','created_at']


                    
         


        


        

       