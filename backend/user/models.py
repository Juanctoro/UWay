from django.contrib.auth.models import AbstractUser
from django.db import models
from institution.models import Institution  # tu otra app

class User(AbstractUser):
    dni                   = models.CharField('DNI', max_length=20, primary_key=True, unique=True)
    names               = models.CharField('Nombres', max_length=150)
    lastnames             = models.CharField('Apellidos', max_length=150)
    phone              = models.CharField('Teléfono', max_length=30, blank=True)
    address           = models.CharField('Dirección', max_length=255, blank=True)
    email                 = models.EmailField('Email', unique=True)
    institutional_email   = models.EmailField('Email institucional', unique=True, null=True,blank=True)
    password              = models.CharField('Email institucional', max_length=255)
    institution          = models.ForeignKey(
                             Institution,
                             on_delete=models.SET_NULL,
                             null=True,
                             blank=True,
                             related_name='user',
                             verbose_name='Institución'
                           )

    USERNAME_FIELD = 'dni'
    REQUIRED_FIELDS = ['username', 'email', 'names', 'lastnames']


    def __str__(self):
        return f"{self.dni} – {self.names} {self.lastnames}"
