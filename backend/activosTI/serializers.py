"""Importaciones de datos requeridos"""
import locale
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User, Group
from Equipos.models import Equipo
from ComplementosActivos.models import Aplicaciones
from Licencias.models import LicenciaPersona
from .models import Persona, CatCentroCosto, CatArea, CatRegion, CatCargo, CatEstadoPersona, Historicos

# Inicio Gestión Tokenización
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Obtener el primer grupo del usuario como su rol
        if user.groups.exists():
            token['role'] = user.groups.first().name  # Asigna el primer grupo como rol
        else:
            token['role'] = 'No role assigned'
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        data.update({'user': {
            'username': self.user.username,
            'email': self.user.email,
            'nombre': self.user.first_name,
            'apellidos': self.user.last_name,
            'role': self.user.groups.first().name if self.user.groups.exists() else 'No role assigned'
        }})

        return data

# Fin Gestión Tokenización

# /---------------------------//---------------------------/

# Inicio Gestión Usuarios

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)  # No es necesario en la actualización
    group = serializers.ChoiceField(choices=[], required=True, write_only=True)  # ChoiceField para mostrar grupos

    class Meta:
        model = User
        fields = ('id','username', 'email', 'password', 'first_name', 'last_name', 'group')

    def __init__(self, *args, **kwargs):
        super(UserSerializer, self).__init__(*args, **kwargs)
        # Cargar los grupos existentes como opciones para el ChoiceField
        self.fields['group'].choices = [(group.name, group.name) for group in Group.objects.all()]

    def create(self, validated_data):
        group_name = validated_data.pop('group')
        password = validated_data.pop('password', None)

        # Crear el usuario
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()

        # Asignar el grupo
        group = Group.objects.get(name=group_name)
        user.groups.add(group)

        return user

    def update(self, instance, validated_data):
        group_name = validated_data.pop('group', None)

        # Actualizar grupo si se proporciona
        if group_name:
            instance.groups.clear()  # Limpiar grupos actuales
            group = Group.objects.get(name=group_name)
            instance.groups.add(group)

        # Actualizar campos de usuario
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Agregar el nombre del grupo actual en la representación
        group = instance.groups.first()
        representation['group'] = group.name if group else None
        return representation

class CambioContraseñaUsuarioSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("La contraseña actual es incorrecta.")
        return value

    def validate_new_password(self, value):
        # Aquí puedes agregar validaciones adicionales para la nueva contraseña (longitud, caracteres especiales, etc.)
        if len(value) < 8:
            raise serializers.ValidationError("La nueva contraseña debe tener al menos 8 caracteres.")
        return value

    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance

class CambioContraseñaAdminSerializer(serializers.Serializer):
    new_password = serializers.CharField(required=True, write_only=True)
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("Las contraseñas no coinciden.")
        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance

# Fin Gestión Usuarios

# /---------------------------//---------------------------/

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
        equipos = [asignacion.id_equipo for asignacion in obj.asignacionequipos_set.all()]
        return EquipoSerializer(equipos, many=True).data

    def get_licencias(self, obj):
        licencias = [asignacion.id_licencia for asignacion in obj.asignacionlicenciapersona_set.all()]
        return LicenciaPersonaSerializer(licencias, many=True).data

    def get_aplicaciones(self, obj):
        aplicaciones = [asignacion.id_aplicacion for asignacion in obj.asignacionaplicaciones_set.all()]
        return AplicacionesSerializer(aplicaciones, many=True).data
