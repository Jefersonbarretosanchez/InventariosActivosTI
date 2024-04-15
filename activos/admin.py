from django.contrib import admin
from .models import Persona,Alianza

class PersonasAdmin(admin.ModelAdmin):
    """Configuracion Modulo Admin Personas"""
    list_display = ["identificacion", 'nombres',
                    'apellidos', 'fecha_ingreso']
    readonly_fields = ("fecharegistro", 'fecha_actualizacion')
    search_fields = ['correo_insitucional', 'nombres']
    #list_filter = ['estado']
    ordering = ['-fecharegistro', 'nombres']
    # ordering=['-id']
    list_display_links = ['identificacion']
    list_per_page = 25  # Paginacion
    
# Register your models here.
admin.site.register(Persona, PersonasAdmin)