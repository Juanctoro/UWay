from django.db.models.signals import post_save
from django.dispatch import receiver
from student.models import Student 
from teacher.models import Teacher
from utils.email import send_confirmation_email

# Señal de envío al crear estudiante
@receiver(post_save, sender=Student)
def send_email_to_student(sender, instance, created, **kwargs):
    if created:
        send_confirmation_email(instance.user)

# Señal de envío al crear profesor
@receiver(post_save, sender=Teacher)
def send_email_to_teacher(sender, instance, created, **kwargs):
    if created:
        send_confirmation_email(instance.user)