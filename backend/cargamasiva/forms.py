"""Importaciones"""
from django import forms

class UploadExcelForm(forms.Form):
    """Formulario Para Carga Masiva"""
    archivo_excel = forms.FileField()