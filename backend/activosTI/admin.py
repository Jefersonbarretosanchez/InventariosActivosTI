from django.contrib import admin
from .models import Persona

class PersonaAdmin(admin.ModelAdmin):
    """Configuracion Modulo Admin Medio Carga"""

# Register your models here.
admin.site.register(Persona, PersonaAdmin)