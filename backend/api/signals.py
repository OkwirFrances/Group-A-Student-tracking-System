from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.core.mail import send_mail 
from django.conf import settings 

User = get_user_model() 

@receiver(post_save, sender = User)
def send_verificatiion_email(sender, instance, created, **kwargs):
    if created:
        subject = 'Verify your account'
        message =f'Hello {instance.username},\n\nPlease verify your account by clicking the link below:\n\nhttp://localhost:8000/api/verify-email/{instance.id}/'
        send_mail(
            subject, message, settings.EMAIL_HOST_USER, [instance.email], fail_silently = False
        )
        
        
        