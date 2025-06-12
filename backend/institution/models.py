from django.db import models

class Institution(models.Model):
    name     = models.CharField('Nombre', max_length=255)
    address  = models.CharField('Dirección', max_length=255)
    logo_url = models.CharField('URL del logo', max_length=255, blank=True)
    color    = models.CharField('Color principal', max_length=50, blank=True)

    def __str__(self):
        return self.name
