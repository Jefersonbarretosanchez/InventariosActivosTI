"""Importaciones de datos requeridos"""
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


class BaseModel(serializers.ModelSerializer):
    fecha_registro = serializers.DateField()

    class Meta:
        abstract = True


class MarcaEquipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatMarcaequipo
        fields = ['id_marcaequipo', 'nombre', 'fecha_registro']


class SoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatSo
        fields = ['id_so', 'nombre', 'fecha_registro']


class MRamSerializer(BaseModel):
    class Meta:
        model = CatMemoriaram
        fields = ['id_ram', 'nombre', 'fecha_registro']


class DiscoDuroSerializer(BaseModel):
    class Meta:
        model = CatDiscoduro
        fields = ['id_discoduro', 'nombre', 'fecha_registro']


class TipoPropiedadSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatTipopropiedad
        fields = ['id_tipopropiedad', 'nombre','fecha_registro']
        
class TipoEquipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatTipoequipo
        fields = ['id_tipoequipo', 'nombre','fecha_registro']
        
class EstadoEquipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatEstadoequipo
        fields = ['id_estadoequipo', 'nombre','fecha_registro']
        
class CoordinadoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatCoordinadores
        fields = ['id_coordinadores', 'nombre','fecha_registro']
    
class UbicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatUbicacion
        fields = ['id_ubicacion', 'nombre','fecha_registro']


class EquipoSerializer(serializers.ModelSerializer):
    id_marcaequipo = serializers.PrimaryKeyRelatedField(
        queryset=CatMarcaequipo.objects.all())
    id_so = serializers.PrimaryKeyRelatedField(
        queryset=CatSo.objects.all())
    id_ram = serializers.PrimaryKeyRelatedField(
        queryset=CatMemoriaram.objects.all())
    id_discoduro = serializers.PrimaryKeyRelatedField(
        queryset=CatDiscoduro.objects.all())
    id_tipopropiedad = serializers.PrimaryKeyRelatedField(
        queryset=CatTipopropiedad.objects.all())
    id_tipoequipo = serializers.PrimaryKeyRelatedField(
        queryset=CatTipoequipo.objects.all())
    id_coordinadores = serializers.PrimaryKeyRelatedField(
        queryset=CatCoordinadores.objects.all())
    id_ubicacion = serializers.PrimaryKeyRelatedField(
        queryset=CatUbicacion.objects.all())
    id_estadoequipo = serializers.PrimaryKeyRelatedField(
        queryset=CatEstadoequipo.objects.all())
    nombre_estado_equipo = serializers.CharField(
        source='id_estadoequipo.nombre', read_only=True)

    class Meta:
        model = Equipo
        fields = [
            'id_equipo',
            'modelo',
            'sereal',
            'id_marcaequipo',
            'id_so',
            'id_ram',
            'id_discoduro',
            'anydesk',
            'id_tipopropiedad',
            'id_tipoequipo',
            'id_estadoequipo',
            'id_coordinadores',
            'id_ubicacion',
            'procesador',
            'costo',
            'observacion',
            'nombre_estado_equipo',
        ]

    def create(self, validated_data):
        return Equipo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.modelo = validated_data.get(
            'modelo', instance.modelo)
        instance.sereal = validated_data.get('sereal', instance.sereal)
        instance.id_marcaequipo = validated_data.get(
            'id_marcaequipo', instance.id_marcaequipo)
        instance.id_so = validated_data.get('id_so', instance.id_so)
        instance.id_ram = validated_data.get('id_ram', instance.id_ram)
        instance.id_discoduro = validated_data.get(
            'id_discoduro', instance.id_discoduro)
        instance.anydesk = validated_data.get(
            'anydesk', instance.anydesk)
        instance.id_tipopropiedad = validated_data.get(
            'id_tipopropiedad', instance.id_tipopropiedad)
        instance.id_tipoequipo = validated_data.get('id_tipoequipo', instance.id_tipoequipo)
        instance.id_estadoequipo = validated_data.get(
            'id_estadoequipo', instance.id_estadoequipo)
        instance.id_coordinadores = validated_data.get('id_coordinadores', instance.id_coordinadores)
        instance.id_ubicacion = validated_data.get(
            'id_ubicacion', instance.id_ubicacion)
        instance.procesador = validated_data.get('procesador', instance.procesador)
        instance.costo = validated_data.get('costo', instance.costo)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.save()
        return instance