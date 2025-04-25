from django.core.mail import send_mail
from django.conf import settings

from .models import Lecturer, Issue

def notification_email(issue_id, registrar_name):
    
    issue = Issue.objects.get(id=issue_id)
    lecturer = issue.assigned_to  # Using the 'assigned_to' field to get the lecturer
    if not lecturer:
         return {"success": False, "message": "No lecturer assigned to this issue."}

    recipient_email = lecturer.email
    lecturer_name = f"{lecturer.first_name} {lecturer.last_name}"  # Get the lecturer's full name
    subject = 'New Issue Assignment'
    message = (
        f"Dear {lecturer_name},\n"
        f"You have been assigned a new issue by {registrar_name}.\n"
        f"Issue Details:\n"

        

    )
  
   