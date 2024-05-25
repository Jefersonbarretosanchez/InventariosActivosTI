"""Importaciones de datos requeridos"""
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Persona,CatCentroCosto

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

class CentroCostoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatCentroCosto
        fields = ['id_centro_costo', 'nombre','fecha_registro']

class PersonaSerializer(serializers.ModelSerializer):
    centro_costo = serializers.SerializerMethodField()
    area = serializers.SerializerMethodField()
    region = serializers.SerializerMethodField()
    cargo = serializers.SerializerMethodField()
    estado_persona = serializers.SerializerMethodField()

    class Meta:
        model = Persona
        fields = [
            'id_trabajador', 'identificacion', 'nombres', 'apellidos', 
            'correo_personal', 'correo_institucional', 'fecha_ingreso_empresa', 
            'direccion','centro_costo','area', 'region', 'cargo', 'estado_persona'
        ]

    def get_centro_costo(self, obj):
        return obj.id_centro_costo.nombre

    def get_area(self, obj):
        return obj.id_area.nombre

    def get_region(self, obj):
        return obj.id_region.nombre

    def get_cargo(self, obj):
        return obj.id_cargo.nombre

    def get_estado_persona(self, obj):
        return obj.id_estado_persona.nombre
    