"""Importaciones de datos requeridos"""
from rest_framework import serializers
from activosTI.models import Persona
from .models import *


class AplicacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aplicaciones
        fields = '__all__'

    def create(self, validated_data):
        return Aplicaciones.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id_aplicacion = validated_data.get(
            'id_aplicacion', instance.id_aplicacion)
        instance.nombre_aplicativo = validated_data.get(
            'nombre_aplicativo', instance.nombre_aplicativo)
        instance.save()
        return instance

# Serilizadores para asignación de aplicaciones


class PersonaSinAsignacionAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        # Incluye los campos necesarios
        fields = ['id_trabajador', 'nombres', 'apellidos']


class AsignacionAppsPersonasSerializer(serializers.ModelSerializer):
    nombre_aplicacion = serializers.CharField(
        source='id_aplicacion.nombre_aplicativo', read_only=True)
    nombre_trabajador = serializers.CharField(
        source='id_trabajador.nombres', read_only=True)
    apellido_trabajador = serializers.CharField(
        source='id_trabajador.apellidos', read_only=True)

    class Meta:
        model = AsignacionAplicaciones
        fields = ['id', 'id_trabajador', 'nombre_trabajador', 'apellido_trabajador',
                  'id_aplicacion', 'nombre_aplicacion', 'fecha_instalacion']

    def validate(self, data):
        if self.instance is None:
            # Comprobar si el trabajador ya tiene una aplicacion instalada
            trabajador_asignacion = AsignacionAplicaciones.objects.filter(
                id_trabajador=data['id_trabajador']).first()
            # if trabajador_asignacion:
            #     aplicacion = trabajador_asignacion.id_aplicacion
            #     raise serializers.ValidationError({"id_trabajador": f"El trabajador ya tiene un aplicativo asignado: {aplicacion.nombre_aplicativo} (ID: {aplicacion.id_aplicacion})."})
        else:
            # En la actualización, verificar si id_aplicativo ha cambiado
            if 'id_trabajador' in data and self.instance.id_aplicacion != data['id_aplicacion']:
                asignacion_existente = AsignacionAplicaciones.objects.filter(
                    id_aplicacion=data['id_aplicacion']).first()
                if asignacion_existente:
                    usuario = asignacion_existente.id_trabajador
                    raise serializers.ValidationError(
                        f"La licencia ya está asignada a {usuario.nombres} {usuario.apellidos} (ID: {
                            usuario.id_trabajador}, Email: {usuario.correo_institucional}).")
                trabajador_asignacion = AsignacionAplicaciones.objects.filter(
                    id_trabajador=data['id_trabajador']).first()
                if trabajador_asignacion:
                    aplicativo = trabajador_asignacion.id_aplicacion
                    raise serializers.ValidationError({"id_trabajador": f"El trabajador ya tiene una licencia asignada: {aplicativo.nombre_aplicativo} (ID: {aplicativo.id_aplicacion})."}
                                                      )
        return data

    def create(self, validated_data):
        aplicativo = validated_data['id_aplicacion']
        aplicativo.save()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class DesAsignacionAppsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsignacionAplicaciones
        fields = '__all__'

    def update(self, instance, validated_data):
        if 'id_licencia' in validated_data:
            aplicacion = validated_data['id_aplicacion']
            aplicacion.save()
        return super().update(instance, validated_data)
