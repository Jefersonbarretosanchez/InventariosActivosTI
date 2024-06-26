"""Importaciones de datos requeridos"""
from rest_framework import serializers
from .models import Aplicaciones


class AplicacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aplicaciones
        fields =  '__all__'

    def create(self, validated_data):
        return Aplicaciones.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id_aplicacion = validated_data.get(
            'id_aplicacion', instance.id_aplicacion)
        instance.nombre_aplicativo = validated_data.get('nombre_aplicativo', instance.nombre_aplicativo)
        instance.fecha_instalacion = validated_data.get(
            'fecha_instalacion', instance.fecha_instalacion)
        instance.save()
        return instance