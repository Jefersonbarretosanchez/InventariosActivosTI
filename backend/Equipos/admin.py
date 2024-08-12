from django.contrib import admin
from .models import *

# Register your models here.
class EquipoAdmin(admin.ModelAdmin):
    """Configuracion Modulo Admin Equipos"""
    list_display = ["id_equipo",'nombre_equipo','modelo','id_estadoequipo']
    #readonly_fields = ("fecharegistro", 'fecha_actualizacion')
    search_fields = ['nombre_equipo', 'modelo']
    list_filter = ['id_estadoequipo']
    ordering = ['id_equipo']
    # ordering=['-id']
    list_display_links = ['nombre_equipo']
    list_per_page = 25
    
admin.site.register(Equipo, EquipoAdmin)