from django import forms
from django.forms import ModelForm
from .models import Persona, CatAlianza,CatArea,CatCargo,CatRegion,CatEstadoPersona



class PersonaCreate(ModelForm):
    """" Formulario del modelo Personas"""
    FechaIngreso= forms.DateField(label="Fecha ingreso empresa")
    area=forms.ModelChoiceField(queryset=CatArea.objects.values_list('nombre', flat=True))
    alianza=forms.ModelChoiceField(queryset=CatAlianza.objects.values_list('nombre', flat=True))
    # region=forms.ModelChoiceField(queryset=CatRegion.objects.values_list('nombre', flat=True))
    # cargo=forms.ModelChoiceField(queryset=CatCargo.objects.values_list('nombre', flat=True))
    # estado=forms.ModelChoiceField(queryset=CatEstadoPersona.objects.values_list('nombre', flat=True))
    class Meta:
        """""Modelo Persona"""
        model = Persona
        fields = ['id_trabajador', 'identificacion', 'nombres', 'apellidos',
                  'correo_personal', 'correo_institucional']