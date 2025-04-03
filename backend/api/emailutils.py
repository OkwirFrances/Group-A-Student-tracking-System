from django.core.mail import send_mail
from django.conf import settings
from .models import Lecturer, Issue

def notification_email(issue_id, registrar_name):
    try:
        # Fetch the issue and the associated lecturer
        issue = Issue.objects.get(id=issue_id)
        lecturer = issue.assigned_to  # Using the 'assigned_to' field to get the lecturer
        if not lecturer:
            return {"success": False, "message": "No lecturer assigned to this issue."}
        
        recipient_email = lecturer.email
        lecturer_name = f"{lecturer.first_name} {lecturer.last_name}"  # Get the lecturer's full name
        subject = 'New Issue Assignment'
        message = (
            f"Dear {lecturer_name},\n\n"
            f"You have been assigned a new issue by {registrar_name}.\n"
            f"Issue Details:\n"
            f"Title: {issue.title}\n"
            f"Description: {issue.description}\n\n"
            f"Please address this issue promptly."
        )

        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[recipient_email],
            fail_silently=False,
        )
        return {"success": True, "message": "Email sent successfully to the lecturer."}
    except Issue.DoesNotExist:
        return {"success": False, "message": "Issue not found for the given ID."}
    except Exception as e:
        return {"success": False, "message": f"Failed to send email. Error: {str(e)}"}