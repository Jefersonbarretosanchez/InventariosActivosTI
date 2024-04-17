from django.contrib import admin
from .models import Persona, Equipo

class PersonaAdmin(admin.ModelAdmin):
    """Configuracion Modulo Admin Medio Carga"""
    list_display = ["identificacion", 'nombres','estado','alianza']
    #readonly_fields = ("fecharegistro", 'fecha_actualizacion')
    search_fields = ['identificacion', 'nombres']
    list_filter = ['estado']
    ordering = ['identificacion']
    # ordering=['-id']
    list_display_links = ['identificacion']
    list_per_page = 25  # Paginacion
    
class EquipoAdmin(admin.ModelAdmin):
    """Configuracion Modulo Admin Medio Carga"""

# Register your models here.
admin.site.register(Persona, PersonaAdmin)
admin.site.register(Equipo, EquipoAdmin)