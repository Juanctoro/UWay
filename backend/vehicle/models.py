from django.db import models
from driver.models import Driver

class Vehicle(models.Model):
    # FK obligatorio a Driver (primary key es auto id)
    driver        = models.ForeignKey(
        Driver,
        on_delete=models.CASCADE,
        related_name='vehicles'
    )
    tecnomecanica = models.URLField('Tecnomecanica Certificate URL', max_length=200)
    model         = models.CharField('Model', max_length=100)
    brand         = models.CharField('Brand', max_length=100)
    soat          = models.URLField('SOAT URL', max_length=200)
    status        = models.CharField('Status', max_length=50)
    color         = models.CharField('Color', max_length=50)
    plate         = models.CharField('Plate', max_length=20)
    category      = models.CharField('Category', max_length=50)

    def __str__(self):
        return f"{self.plate} ({self.brand} {self.model})"