from django.core.mail import send_mail
from django.conf import settings

def send_confirmation_email(user):
    subject = 'Bienvenido a UWay'
    message = f"""
    Hola {user.names},

    Gracias por registrarte en UWay. Tu cuenta ha sido creada exitosamente.
    
    A partir de ahora puedes acceder a la plataforma para gestionar y consultar tus rutas de transporte universitario.

    Saludos,
    Equipo de UWay
    """
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [user.email]

    send_mail(subject, message, from_email, recipient_list, fail_silently=False)
