from django import forms
from django.forms import ModelForm
from .models import Persona, CatAlianza,CatArea,CatCargo,CatRegion,CatEstadoPersona



class PersonaCreate(ModelForm):
    """" Formulario del modelo Personas"""
    #FechaIngreso= forms.DateField(label="Fecha ingreso empresa")
    area=forms.ModelChoiceField(queryset=CatArea.objects)
    alianza=forms.ModelChoiceField(queryset=CatAlianza.objects)
    region=forms.ModelChoiceField(queryset=CatRegion.objects)
    cargo=forms.ModelChoiceField(queryset=CatCargo.objects)
    estado=forms.ModelChoiceField(queryset=CatEstadoPersona.objects)
    class Meta:
        """""Modelo Persona"""
        model = Persona
        fields = ['id_trabajador', 'identificacion', 'nombres', 'apellidos',
                  'correo_personal', 'correo_institucional','fecha_ingreso_empresa']
        widgets = {
            'fecha_ingreso_empresa': forms.DateInput(
                format='%Y-%m-%d',
                attrs={
                    'type': 'date',
                    'class': 'form-control',
                    'placeholder': 'Fecha Pruebas Req',
                    'id': 'id_fechaPruebas',
                }
            ),
        }