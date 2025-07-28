from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

class UserAdmin(BaseUserAdmin):
    # Esto asegura que puedas ver tus campos personalizados.
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Campos adicionales', {'fields': ('dni', 'names', 'lastnames', 'phone', 'address', 'institutional_email', 'institution')}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Campos adicionales', {'fields': ('dni', 'names', 'lastnames', 'phone', 'address', 'institutional_email', 'institution')}),
    )

admin.site.register(User, UserAdmin)

