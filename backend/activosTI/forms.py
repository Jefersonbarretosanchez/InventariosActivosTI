"""Importaciones"""
from django import forms
from django.forms import ModelForm
from .models import Persona

# Formularios

class PersonaCreacion(ModelForm):
    """"Formulario Para registro de persona"""

    class Meta:
        """"Clase Meta Persona"""
        model = Persona
        fields = ['id_trabajador',
                  'identificacion', 
                  'nombres', 
                  'apellidos',
                  'correo_personal', 
                  'correo_institucional',
                  'fecha_ingreso_empresa',
                  'id_area', 'id_centro_costo', 
                  'id_region', 
                  'id_estado_persona', 
                  'id_cargo']
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
            'id_area': forms.Select(
                attrs={
                    'class': 'form-select'
                }
            ),
            'id_centro_costo': forms.Select(
                attrs={
                    'class': 'form-select'
                }
            ),
            'id_region': forms.Select(
                attrs={
                    'class': 'form-select'
                }
            ),
            'id_cargo': forms.Select(
                attrs={
                    'class': 'form-select'
                }
            ),
            'id_estado_persona': forms.Select(
                attrs={
                    'class': 'form-select'
                }
            ),
        }


class PersonaActualizar(ModelForm):
    """"Formulario Para registro de persona"""

    class Meta:
        """"Clase Meta Persona"""
        model = Persona
        fields = ['id_trabajador',
                  'identificacion',
                  'nombres', 
                  'apellidos',
                  'correo_personal',
                  'correo_institucional', 
                  'fecha_ingreso_empresa',
                  'id_area', 
                  'id_centro_costo', 
                  'id_region', 
                  'id_estado_persona', 
                  'id_cargo']
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
            'id_area': forms.Select(
                attrs={
                    'class': 'form-select'
                }
            ),
            'id_centro_costo': forms.Select(
                attrs={
                    'class': 'form-select'
                }
            ),
            'id_region': forms.Select(
                attrs={
                    'class': 'form-select'
                }
            ),
            'id_cargo': forms.Select(
                attrs={
                    'class': 'form-select'
                }
            ),
            'id_estado_persona': forms.Select(
                attrs={
                    'class': 'form-select'
                }
            ),
        }
