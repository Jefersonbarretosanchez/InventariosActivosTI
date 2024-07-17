"""Importaciones de datos requeridos"""
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Persona, CatCentroCosto, CatArea, CatRegion, CatCargo, CatEstadoPersona, Historicos


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

# Serializador Historicos
class historicoSerializer(serializers.ModelSerializer):
    """Modulo Historicos"""
    nombre_usuario = serializers.CharField(
        source='usuario.username', read_only=True)
    class Meta:
        model=Historicos
        fields='__all__'

# serializadores catalogos
class CentroCostoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatCentroCosto
        fields = ['id_centro_costo', 'nombre', 'fecha_registro']


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatArea
        fields = ['id_area', 'nombre', 'fecha_registro']


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatRegion
        fields = ['id_region', 'nombre', 'fecha_registro']


class CargoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatCargo
        fields = ['id_cargo', 'nombre', 'fecha_registro']


class EstadoPersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatEstadoPersona
        fields = ['id_estado_persona', 'nombre']


class PersonaSerializer(serializers.ModelSerializer):
    id_centro_costo = serializers.PrimaryKeyRelatedField(
        queryset=CatCentroCosto.objects.all())
    id_area = serializers.PrimaryKeyRelatedField(
        queryset=CatArea.objects.all())
    id_region = serializers.PrimaryKeyRelatedField(
        queryset=CatRegion.objects.all())
    id_cargo = serializers.PrimaryKeyRelatedField(
        queryset=CatCargo.objects.all())
    nombre_estado_persona = serializers.CharField(
        source='id_estado_persona.nombre', read_only=True)

    class Meta:
        model = Persona
        fields = [
            'id_trabajador',
            'identificacion',
            'nombres',
            'apellidos',
            'correo_personal',
            'correo_institucional',
            'fecha_ingreso_empresa',
            'direccion',
            'id_centro_costo',
            'id_area',
            'id_region',
            'id_cargo',
            'id_estado_persona',
            'nombre_estado_persona',
        ]

    def create(self, validated_data):
        return Persona.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.identificacion = validated_data.get(
            'identificacion', instance.identificacion)
        instance.nombres = validated_data.get('nombres', instance.nombres)
        instance.apellidos = validated_data.get(
            'apellidos', instance.apellidos)
        instance.correo_personal = validated_data.get(
            'correo_personal', instance.correo_personal)
        instance.correo_institucional = validated_data.get(
            'correo_institucional', instance.correo_institucional)
        instance.fecha_ingreso_empresa = validated_data.get(
            'fecha_ingreso_empresa', instance.fecha_ingreso_empresa)
        instance.direccion = validated_data.get(
            'direccion', instance.direccion)
        instance.id_centro_costo = validated_data.get(
            'id_centro_costo', instance.id_centro_costo)
        instance.id_area = validated_data.get('id_area', instance.id_area)
        instance.id_region = validated_data.get(
            'id_region', instance.id_region)
        instance.id_cargo = validated_data.get('id_cargo', instance.id_cargo)
        instance.id_estado_persona = validated_data.get(
            'id_estado_persona', instance.id_estado_persona)
        instance.save()
        return instance