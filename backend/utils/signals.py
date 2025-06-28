from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from student.models import Student 
from teacher.models import Teacher
from driver.models import Driver
from staff.models import Staff
from user.models import User
from reservation.models import Reservation
from utils.email import send_user_confirmation_email, send_reservation_confirmation_email

# Guardar estado al crear estudiante
@receiver(pre_save, sender=Student)
def check_email_to_student(sender, instance, **kwargs):
    if not instance.pk:
        return
    try:
        previous = sender.objects.get(pk=instance.user_id)
    except sender.DoesNotExist:
        return 
    
    if not previous.is_active and instance.is_active:
        instance._should_send_activation_email=True # Atributo temporal que crea una señal para el envío posterior del correo

# Señal de envío al verificar estudiante
@receiver(post_save, sender=Student)
def send_activation_email(sender,instance,created, **kwargs):
    if getattr(instance, '_should_send_activation_email', False):
        send_user_confirmation_email(instance.user)

# Guardar estado al crear profesor
@receiver(pre_save, sender=Teacher)
def check_email_to_teacher(sender, instance, **kwargs):
    if not instance.pk:
        return
    try:
        previous = sender.objects.get(pk=instance.user_id)
    except sender.DoesNotExist:
        return
    
    if not previous.is_active and instance.is_active:
        instance._should_send_activation_email=True

# Señal de envío al verificar profesor
@receiver(post_save, sender=Teacher)
def send_email_to_teacher(sender, instance, created, **kwargs):
    if getattr(instance, '_should_send_activation_email', False):
        send_user_confirmation_email(instance.user)

# Guardar estado al crear conductor
@receiver(pre_save, sender=Driver)
def check_email_to_driver(sender, instance, **kwargs):
    if not instance.pk:
        return
    try:
        previous = sender.objects.get(pk=instance.user_id)
    except sender.DoesNotExist:
        return
    
    if not previous.is_approved and instance.is_approved:
        instance._should_send_activation_email=True

# Señal de envío al verificar conductor
@receiver(post_save, sender=Driver)
def send_email_to_driver(sender, instance, created, **kwargs):
    if getattr(instance, '_should_send_activation_email', False):
        send_user_confirmation_email(instance.user)

# Guardar estado al crear funcionario
@receiver(pre_save, sender=Staff)
def check_email_to_driver(sender, instance, **kwargs):
    if not instance.pk:
        return
    try:
        previous = sender.objects.get(pk=instance.user_id)
    except sender.DoesNotExist:
        return
    
    if not previous.is_approved and instance.is_approved:
        instance._should_send_activation_email=True

# Señal de envío al verificar funcionario
@receiver(post_save, sender=Staff)
def send_email_to_driver(sender, instance, created, **kwargs):
    if getattr(instance, '_should_send_activation_email', False):
        send_user_confirmation_email(instance.user)

# Señal de envío al crear reserva
@receiver(post_save, sender=Reservation)
def send_reservation_email_to_user(sender, instance, created, **kwargs):
    send_reservation_confirmation_email(instance.user, instance)