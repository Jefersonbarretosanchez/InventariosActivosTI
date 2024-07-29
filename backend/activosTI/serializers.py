"""Importaciones de datos requeridos"""
import locale
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from Equipos.models import Equipo, AsignacionEquipos
from ComplementosActivos.models import Aplicaciones, AsignacionAplicaciones
from Licencias.models import LicenciaPersona, AsignacionLicenciaPersona
from .models import Persona, CatCentroCosto, CatArea, CatRegion, CatCargo, CatEstadoPersona, Historicos


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        data.update({'user': {
            'userId': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'nombre': self.user.first_name,
            'apellidos': self.user.last_name,
        }})

        return data


class UserSerializer(serializers.ModelSerializer):
    """Serializador para el Usuario"""
    class Meta:
        model = User
        fields = ['id', 'username', 'password',
                  'email', 'first_name', 'last_name']

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
    fecha = serializers.SerializerMethodField()

    class Meta:
        model = Historicos
        fields = ['id_historico', 'fecha', 'nombre_usuario', 'correo_usuario',
                  'tipo_cambio', 'tipo_activo', 'activo_modificado', 'descripcion']

    def get_fecha(self, obj):
        locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')
        return obj.fecha_registro.strftime('%d de %B de %Y a las %H:%M')

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

# Modulos de activos general


class EquipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipo
        fields = ['nombre_equipo', 'anydesk']


class LicenciaPersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = LicenciaPersona
        fields = ['nombre_licencia', 'fecha_vencimiento']


class AplicacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aplicaciones
        fields = ['nombre_aplicativo']


class ActivosSerializer(serializers.ModelSerializer):
    equipos = serializers.SerializerMethodField()
    licencias = serializers.SerializerMethodField()
    aplicaciones = serializers.SerializerMethodField()
    nombre_centro_costo = serializers.CharField(
        source='id_centro_costo.nombre', read_only=True)
    nombre_area = serializers.CharField(
        source='id_area.nombre', read_only=True)
    nombre_region = serializers.CharField(
        source='id_region.nombre', read_only=True)
    nombre_cargo = serializers.CharField(
        source='id_cargo.nombre', read_only=True)
    nombre_estado_persona = serializers.CharField(
        source='id_estado_persona.nombre', read_only=True)

    class Meta:
        model = Persona
        fields = ['identificacion', 'nombres', 'apellidos', 'correo_institucional',
                  'nombre_centro_costo', 'nombre_area', 'nombre_region', 'nombre_cargo', 'fecha_ingreso_empresa', 'nombre_estado_persona',
                  'equipos', 'licencias', 'aplicaciones']

    def get_equipos(self, obj):
        asignaciones = AsignacionEquipos.objects.filter(
            id_trabajador=obj.id_trabajador)
        equipos = [asignacion.id_equipo for asignacion in asignaciones]
        return EquipoSerializer(equipos, many=True).data

    def get_licencias(self, obj):
        asignaciones = AsignacionLicenciaPersona.objects.filter(
            id_trabajador=obj.id_trabajador)
        licencias = [asignacion.id_licencia for asignacion in asignaciones]
        return LicenciaPersonaSerializer(licencias, many=True).data

    def get_aplicaciones(self, obj):
        asignaciones = AsignacionAplicaciones.objects.filter(
            id_trabajador=obj.id_trabajador)
        aplicaciones = [
            asignacion.id_aplicacion for asignacion in asignaciones]
        return AplicacionesSerializer(aplicaciones, many=True).data
