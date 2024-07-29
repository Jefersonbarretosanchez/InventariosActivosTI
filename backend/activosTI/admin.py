from django.urls import path,reverse
from django.contrib import admin
from .models import *
from .views import upload_excel_view

class PersonaAdmin(admin.ModelAdmin):
    """Configuracion Modulo Admin Medio Carga"""
    list_display = ["identificacion", 'nombres','id_estado_persona','id_centro_costo']
    #readonly_fields = ("fecharegistro", 'fecha_actualizacion')
    search_fields = ['identificacion', 'nombres']
    list_filter = ['id_estado_persona']
    ordering = ['identificacion']
    # ordering=['-id']
    list_display_links = ['identificacion']
    list_per_page = 25

class AreaAdmin(admin.ModelAdmin):
    list_display = ["id_area", 'nombre','fecha_registro']
    search_fields = ['nombre']
    ordering = ['id_area']
    list_display_links = ['nombre']
    list_per_page = 25 
    
class RegionAdmin(admin.ModelAdmin):
    list_display = ["id_region", 'nombre','fecha_registro']
    search_fields = ['nombre']
    ordering = ['id_region']
    list_display_links = ['nombre']
    list_per_page = 25  # Paginacion

# Register your models here.
admin.site.register(Persona, PersonaAdmin)
# admin.site.register(Equipo, EquipoAdmin)
admin.site.register(CatArea,AreaAdmin)
admin.site.register(CatRegion,RegionAdmin)
