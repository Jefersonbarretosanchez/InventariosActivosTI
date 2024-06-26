"""Importaciones de datos requeridos"""
from rest_framework import serializers
from activosTI.models import Persona, CatCentroCosto
from .models import *


class BaseModel(serializers.ModelSerializer):
    fecha_registro = serializers.DateField()

    class Meta:
        abstract = True


class PersonaLicenciasSerializers(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = ['id_trabajador', 'nombres', 'apellidos']


class EstadoLicenciasSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatEstadoLicencias
        fields = ['id_estado_licencia', 'nombre', 'fecha_registro']


class ContratosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contratos
        fields = '__all__'


class LicenciaPersonasSerializer(serializers.ModelSerializer):
    id_estado_licencia = serializers.PrimaryKeyRelatedField(
        queryset=CatEstadoLicencias.objects.all())
    id_contrato = serializers.PrimaryKeyRelatedField(
        queryset=Contratos.objects.all())
    id_solicitante = serializers.PrimaryKeyRelatedField(
        queryset=Persona.objects.all())
    # sereal=serializers.SerializerMethodField()
    nombre_estado_licencia = serializers.CharField(
        source='id_estado_licencia.nombre', read_only=True)
    nombre_contrato = serializers.CharField(
        source='id_contrato.nombre', read_only=True)

    class Meta:
        model = LicenciaPersona
        fields = [
            'id_licencia',
            'nombre_licencia',
            'id_estado_licencia',
            'sereal',
            'fecha_vencimiento',
            'id_contrato',
            'no_ticket',
            'id_solicitante',
            'nombre_estado_licencia',
            'nombre_contrato',
        ]
    # def get_sereal(self, obj):
    #     return obj.id_contrato.sereal if obj.id_contrato else None

    def create(self, validated_data):
        return LicenciaPersona.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.nombre_licencia = validated_data.get(
            'nombre_licencia', instance.nombre_licencia)
        instance.id_estado_licencia = validated_data.get(
            'id_estado_licencia', instance.id_estado_licencia)
        instance.sereal = validated_data.get('sereal', instance.sereal)
        instance.fecha_vencimiento = validated_data.get(
            'fecha_vencimiento', instance.fecha_vencimiento)
        instance.id_contrato = validated_data.get(
            'id_contrato', instance.id_contrato)
        instance.no_ticket = validated_data.get(
            'no_ticket', instance.no_ticket)
        instance.id_solicitante = validated_data.get(
            'id_solicitante', instance.id_solicitante)
        instance.save()
        return instance


class LicenciaEquiposSerializer(serializers.ModelSerializer):
    id_estado_licencia = serializers.PrimaryKeyRelatedField(
        queryset=CatEstadoLicencias.objects.all())
    id_contrato = serializers.PrimaryKeyRelatedField(
        queryset=Contratos.objects.all())
    id_solicitante = serializers.PrimaryKeyRelatedField(
        queryset=Persona.objects.all())
    nombre_estado_licencia = serializers.CharField(
        source='id_estado_licencia.nombre', read_only=True)
    nombre_contrato = serializers.CharField(
        source='id_contrato.nombre', read_only=True)

    class Meta:
        model = LicenciasEquipo
        fields = [
            'id_licencia',
            'nombre_licencia',
            'id_estado_licencia',
            'sereal',
            'fecha_vencimiento',
            'id_contrato',
            'no_ticket',
            'id_solicitante',
            'nombre_estado_licencia',
            'nombre_contrato',
        ]

    def create(self, validated_data):
        return LicenciasEquipo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.nombre_licencia = validated_data.get(
            'nombre_licencia', instance.nombre_licencia)
        instance.id_estado_licencia = validated_data.get(
            'id_estado_licencia', instance.id_estado_licencia)
        instance.sereal = validated_data.get('sereal', instance.sereal)
        instance.fecha_vencimiento = validated_data.get(
            'fecha_vencimiento', instance.fecha_vencimiento)
        instance.id_contrato = validated_data.get(
            'id_contrato', instance.id_contrato)
        instance.no_ticket = validated_data.get(
            'no_ticket', instance.no_ticket)
        instance.id_solicitante = validated_data.get(
            'id_solicitante', instance.id_solicitante)
        instance.save()
        return instance


class LicenciaAreasSerializer(serializers.ModelSerializer):
    id_estado_licencia = serializers.PrimaryKeyRelatedField(
        queryset=CatEstadoLicencias.objects.all())
    id_contrato = serializers.PrimaryKeyRelatedField(
        queryset=Contratos.objects.all())
    id_responsable = serializers.PrimaryKeyRelatedField(
        queryset=Persona.objects.all())
    id_centro_costo = serializers.PrimaryKeyRelatedField(
        queryset=CatCentroCosto.objects.all())
    nombre_estado_licencia = serializers.CharField(
        source='id_estado_licencia.nombre', read_only=True)
    nombre_contrato = serializers.CharField(
        source='id_contrato.nombre', read_only=True)

    class Meta:
        model = LicenciaArea
        fields = [
            'id_licencia',
            'nombre_licencia',
            'id_estado_licencia',
            'sereal',
            'fecha_vencimiento',
            'id_contrato',
            'no_ticket',
            'id_responsable',
            'id_centro_costo',
            'cantidad',
            'nombre_estado_licencia',
            'nombre_contrato',
        ]

    def create(self, validated_data):
        return LicenciaArea.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.nombre_licencia = validated_data.get(
            'nombre_licencia', instance.nombre_licencia)
        instance.id_estado_licencia = validated_data.get(
            'id_estado_licencia', instance.id_estado_licencia)
        instance.sereal = validated_data.get('sereal', instance.sereal)
        instance.fecha_vencimiento = validated_data.get(
            'fecha_vencimiento', instance.fecha_vencimiento)
        instance.id_contrato = validated_data.get(
            'id_contrato', instance.id_contrato)
        instance.no_ticket = validated_data.get(
            'no_ticket', instance.no_ticket)
        instance.id_responsable = validated_data.get(
            'id_responsable', instance.id_responsable)
        instance.id_centro_costo = validated_data.get(
            'id_centro_costo', instance.id_centro_costo)
        instance.cantidad = validated_data.get('cantidad', instance.cantidad)
        instance.save()
        return instance
