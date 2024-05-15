"""Importaciones de datos requeridos"""
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Persona

class UserSerializer(serializers.ModelSerializer):
    """Serializador para el Usuario"""
    class Meta:
        model = User
        fields = ['id', 'username', 'password']

        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        # Token.objects.create(user=user)
        return user

class PersonaSerializer(serializers.ModelSerializer):
    """Serializador para el modelo Persona"""
    class Meta:
        model = Persona
        fields = ['id_trabajador', 'identificacion', 'nombres', 'apellidos', 'correo_personal', 'correo_institucional', 'id_alianza',
                  'id_area', 'id_region', 'id_cargo', 'fecha_ingreso_empresa', 'id_estado_persona']
