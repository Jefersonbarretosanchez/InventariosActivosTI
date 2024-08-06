from django.urls import path,reverse
from django.contrib import admin
from .models import *

class PersonaAdmin(admin.ModelAdmin):
    """Configuracion Modulo Admin Medio Carga"""
    list_display = ["id_trabajador","identificacion", 'nombres','id_estado_persona','id_centro_costo']
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

class CargoAdmin(admin.ModelAdmin):
    list_display = ["id_cargo", 'nombre','fecha_registro']
    search_fields = ['nombre']
    ordering = ['id_cargo']
    list_display_links = ['nombre']
    list_per_page = 25
    
class CentroCostoAdmin(admin.ModelAdmin):
    list_display = ["id_centro_costo", 'nombre','fecha_registro']
    search_fields = ['nombre']
    ordering = ['id_centro_costo']
    list_display_links = ['nombre']
    list_per_page = 25
    
class EstadoPersonaAdmin(admin.ModelAdmin):
    list_display = ["id_estado_persona", 'nombre','fecha_registro']
    search_fields = ['nombre']
    ordering = ['id_estado_persona']
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
admin.site.register(CatCargo,CargoAdmin)
admin.site.register(CatCentroCosto,CentroCostoAdmin)
admin.site.register(CatEstadoPersona,EstadoPersonaAdmin)
admin.site.register(CatRegion,RegionAdmin)
