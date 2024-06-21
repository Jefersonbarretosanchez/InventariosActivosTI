from django.contrib import admin
from .models import *

class PersonaAdmin(admin.ModelAdmin):
    """Configuracion Modulo Admin Medio Carga"""
    list_display = ["identificacion", 'nombres','id_estado_persona','id_centro_costo']
    #readonly_fields = ("fecharegistro", 'fecha_actualizacion')
    search_fields = ['identificacion', 'nombres']
    list_filter = ['id_estado_persona']
    ordering = ['identificacion']
    # ordering=['-id']
    list_display_links = ['identificacion']
    list_per_page = 25  # Paginacion
    
# class EquipoAdmin(admin.ModelAdmin):
#     """Configuracion Modulo Admin Medio Carga"""

class AreaAdmin(admin.ModelAdmin):
    """Configuracion Modulo Admin Catalogo Areas"""

# Register your models here.
admin.site.register(Persona, PersonaAdmin)
# admin.site.register(Equipo, EquipoAdmin)
admin.site.register(CatArea,AreaAdmin)
