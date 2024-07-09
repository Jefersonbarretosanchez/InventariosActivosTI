"""Importaciones de datos requeridos"""
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from activosTI.models import Persona


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
        fields = ['id_tipopropiedad', 'nombre', 'fecha_registro']


class TipoEquipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatTipoequipo
        fields = ['id_tipoequipo', 'nombre', 'fecha_registro']


class EstadoEquipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatEstadoequipo
        fields = ['id_estadoequipo', 'nombre', 'fecha_registro']


class CoordinadoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatCoordinadores
        fields = ['id_coordinadores', 'nombre', 'fecha_registro']


class UbicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatUbicacion
        fields = ['id_ubicacion', 'nombre', 'fecha_registro']


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
        queryset=CatCoordinadores.objects.all(), allow_null=True)
    id_ubicacion = serializers.PrimaryKeyRelatedField(
        queryset=CatUbicacion.objects.all(), allow_null=True)
    id_estadoequipo = serializers.PrimaryKeyRelatedField(
        queryset=CatEstadoequipo.objects.all())
    nombre_estado_equipo = serializers.CharField(
        source='id_estadoequipo.nombre', read_only=True)

    class Meta:
        model = Equipo
        fields = [
            'id_equipo',
            'nombre_equipo',
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
        instance.nombre_equipo = validated_data.get(
            'nombre_equipo', instance.nombre_equipo)
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
        instance.id_tipoequipo = validated_data.get(
            'id_tipoequipo', instance.id_tipoequipo)
        instance.id_estadoequipo = validated_data.get(
            'id_estadoequipo', instance.id_estadoequipo)
        instance.id_coordinadores = validated_data.get(
            'id_coordinadores', instance.id_coordinadores)
        instance.id_ubicacion = validated_data.get(
            'id_ubicacion', instance.id_ubicacion)
        instance.procesador = validated_data.get(
            'procesador', instance.procesador)
        instance.costo = validated_data.get('costo', instance.costo)
        instance.observacion = validated_data.get(
            'observacion', instance.observacion)
        instance.save()
        return instance

# Serializadores Modulo asignaciones
class PersonasAsigEquiposSerializer(serializers.ModelSerializer):
    trabajadores_con_asignaciones = AsignacionEquipos.objects.values_list(
        'id_trabajador', flat=True)
    trabajadores_sin_asignaciones = Persona.objects.exclude(
        id_trabajador__in=AsignacionEquipos.objects.values_list('id_trabajador', flat=True))

    id_trabajador = serializers.PrimaryKeyRelatedField(
        queryset=trabajadores_con_asignaciones)
    
    class Meta:
        model = Persona
        fields = ['id_trabajador', 'nombres','apellidos']
        

class EquiposAsignacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipo
        fields = ['id_equipo', 'nombre_equipo']


class AsignacionEquiposSerializer(serializers.ModelSerializer):
    nombre_trabajador = serializers.CharField(
        source='id_trabajador.nombres', read_only=True)
    apellido_trabajador = serializers.CharField(
        source='id_trabajador.apellidos', read_only=True)
    nombre_equipo = serializers.CharField(
        source='id_equipo.nombre_equipo', read_only=True)

    # # ||Filtrar los equipos que esten en Bodega para mostrarlos en la lista.||
    # equipos_en_bodega = Equipo.objects.filter(
    #     id_estadoequipo=CatEstadoequipo.objects.get(nombre="En Bodega"))

    # # ||Obtener la lista de trabajadores con asignaciones y excluirlos del listado que se muestra para asignar un equipo.||
    # trabajadores_con_asignaciones = AsignacionEquipos.objects.values_list(
    #     'id_trabajador', flat=True)
    # trabajadores_sin_asignaciones = Persona.objects.exclude(
    #     id_trabajador__in=AsignacionEquipos.objects.values_list('id_trabajador', flat=True))

    # id_equipo = serializers.PrimaryKeyRelatedField(queryset=equipos_en_bodega)

    # id_trabajador = serializers.PrimaryKeyRelatedField(
    #     queryset=trabajadores_sin_asignaciones)

    class Meta:
        model = AsignacionEquipos
        fields = ['id_asignacion', 'id_trabajador','nombre_trabajador','apellido_trabajador','nombre_equipo', 'id_equipo',
                  'fecha_entrega_equipo', 'id_kit_perifericos']

    def validate(self, data):
        if self.instance is None:
            # Comprobar si el equipo ya está asignado
            asignacion_existente = AsignacionEquipos.objects.filter(
                id_equipo=data['id_equipo']).first()
            if asignacion_existente:
                usuario = asignacion_existente.id_trabajador
                raise serializers.ValidationError({"id_equipo": f"El equipo ya está asignado a {usuario.nombres} {usuario.apellidos} (ID: {usuario.id_trabajador}, Email: {usuario.correo_institucional})."}
                                                  )
            # Comprobar si el trabajador ya tiene un equipo asignado
            trabajador_asignacion = AsignacionEquipos.objects.filter(
                id_trabajador=data['id_trabajador']).first()
            if trabajador_asignacion:
                equipo = trabajador_asignacion.id_equipo
                raise serializers.ValidationError({"id_trabajador": f"El trabajador ya tiene un equipo asignado: {equipo.nombre_equipo} (ID: {equipo.id_equipo})."}
                                                  )
        else:
            # En la actualización, verificar si id_equipo ha cambiado y si el nuevo valor ya está asignado
            if 'id_equipo' in data and self.instance.id_equipo != data['id_equipo']:
                asignacion_existente = AsignacionEquipos.objects.filter(
                    id_equipo=data['id_equipo']).first()
                if asignacion_existente:
                    usuario = asignacion_existente.id_trabajador
                    raise serializers.ValidationError(
                        f"El equipo ya está asignado a {usuario.nombres} {usuario.apellidos} (ID: {usuario.id_trabajador}, Email: {usuario.correo_institucional}).")
            # Comprobar si el trabajador ya tiene un equipo asignado solo si el trabajador ha cambiado
            if 'id_trabajador' in data and self.instance.id_trabajador != data['id_trabajador']:
                trabajador_asignacion = AsignacionEquipos.objects.filter(
                    id_trabajador=data['id_trabajador']).first()
                if trabajador_asignacion:
                    equipo = trabajador_asignacion.id_equipo
                    raise serializers.ValidationError({"errors": f"El trabajador ya tiene un equipo asignado: {equipo.nombre_equipo} (ID: {equipo.id_equipo})."}
                                                      )
        return data

    def create(self, validated_data):
        equipo = validated_data['id_equipo']
        equipo.id_estadoequipo = CatEstadoequipo.objects.get(nombre="Asignado")
        equipo.save()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class DesAsignacionEquiposSerializer(serializers.ModelSerializer):
    id_coordinadores = serializers.PrimaryKeyRelatedField(
        queryset=CatCoordinadores.objects.all(), required=False, allow_null=True)
    id_ubicacion = serializers.PrimaryKeyRelatedField(
        queryset=CatUbicacion.objects.all(), required=False, allow_null=True)

    class Meta:
        model = AsignacionEquipos
        fields = '__all__'

    def validate(self, data):
        if data['id_equipo'].id_estadoequipo.nombre == "Asignado":
            raise serializers.ValidationError(
                "El equipo ya está asignado a otra persona.")
        return data

    def create(self, validated_data):
        equipo = validated_data['id_equipo']
        equipo.id_estadoequipo = CatEstadoequipo.objects.get(nombre="Asignado")
        validated_data.pop('id_coordinadores', None)
        validated_data.pop('id_ubicacion', None)
        equipo.save()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'id_equipo' in validated_data:
            equipo = validated_data['id_equipo']
            equipo.id_estadoequipo = CatEstadoequipo.objects.get(
                nombre="En Bodega")
            equipo.save()
        return super().update(instance, validated_data)

# Serializadores Perifericos


class EstadoPerifericosSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatEstadoPeriferico
        fields = '__all__'


class PerifericosSerializer(serializers.ModelSerializer):
    nombre_estado_periferico = serializers.CharField(
        source='id_estado_periferico.nombre', read_only=True)
    class Meta:
        model = Perifericos
        fields = ['id_perifericos', 'nombre_periferico',
                  'id_estado_periferico', 'modelo', 'sereal', 'costo','nombre_estado_periferico']


class KitPerifericosSerializer(serializers.ModelSerializer):
    nombre_periferico = serializers.CharField(
        source='id_periferico.nombre', read_only=True)
    
    # Filtramos los perifericos sin asignar de la manera correcta
    perifericos_sin_asignar = Perifericos.objects.filter(id_estado_periferico=CatEstadoPeriferico.objects.get(nombre="Sin Asignar"))
    perifericos = serializers.PrimaryKeyRelatedField(
        queryset=perifericos_sin_asignar, many=True)

    class Meta:
        model = KitPerifericos
        fields = ['id_kit_perifericos', 'perifericos', 'nombre_periferico']

    def validate(self, data):
        if self.instance is None:
            # Comprobar si el periférico ya está en un kit
            for periferico in data['perifericos']:
                if KitPerifericos.objects.filter(perifericos=periferico).exists():
                    equipo = KitPerifericos.objects.filter(
                        perifericos=periferico).first()
                    raise serializers.ValidationError(
                        {"id_periferico": f"El periférico ya está asignado en el kit # {equipo.id_kit_perifericos}."})
        else:
            # En la actualización, verificar si id_perifericos ha cambiado y si el nuevo valor ya está asignado
            for periferico in data['perifericos']:
                if KitPerifericos.objects.filter(perifericos=periferico).exists() and periferico not in self.instance.perifericos.all():
                    equipo = KitPerifericos.objects.filter(
                        perifericos=periferico).first()
                    raise serializers.ValidationError(
                        {"id_periferico": f"El periférico ya está asignado al kit # {equipo.id_kit_perifericos}."})
        return data

    def create(self, validated_data):
        perifericos_data = validated_data.pop('perifericos')
        kit_perifericos = KitPerifericos.objects.create(**validated_data)
        kit_perifericos.perifericos.set(perifericos_data)
        # Actualizar el estado de los periféricos a "Asignado"
        estado_asignado = CatEstadoPeriferico.objects.get(nombre="Asignado")
        for periferico in perifericos_data:
            periferico.id_estado_periferico = estado_asignado
            periferico.save()
        return kit_perifericos
    
class KitPerifericosUpdateSerializer(serializers.ModelSerializer):
    nombre_periferico = serializers.CharField(
        source='id_periferico.nombre', read_only=True)
    perifericos = serializers.PrimaryKeyRelatedField(
        queryset=Perifericos.objects.all(), many=True)

    class Meta:
        model = KitPerifericos
        fields = ['id_kit_perifericos', 'perifericos', 'nombre_periferico']

    def validate(self, data):
        # En la actualización, verificar si id_perifericos ha cambiado y si el nuevo valor ya está asignado
        for periferico in data['perifericos']:
            if KitPerifericos.objects.filter(perifericos=periferico).exists() and periferico not in self.instance.perifericos.all():
                equipo = KitPerifericos.objects.filter(
                    perifericos=periferico).first()
                raise serializers.ValidationError(
                    {"id_periferico": f"El periférico ya está asignado al kit # {equipo.id_kit_perifericos}."})
        return data
    
    def update(self, instance, validated_data):
        perifericos_data = validated_data.pop('perifericos')
        perifericos_actuales = set(instance.perifericos.all())
        nuevos_perifericos = set(perifericos_data)

        # Perifericos quitados
        perifericos_quitados = perifericos_actuales - nuevos_perifericos
        estado_sin_asignar = CatEstadoPeriferico.objects.get(nombre="Sin Asignar")
        for periferico in perifericos_quitados:
            periferico.id_estado_periferico = estado_sin_asignar
            periferico.save()

        # Perifericos agregados
        estado_asignado = CatEstadoPeriferico.objects.get(nombre="Asignado")
        for periferico in nuevos_perifericos:
            periferico.id_estado_periferico = estado_asignado
            periferico.save()

        instance.perifericos.set(nuevos_perifericos)
        instance.save()
        return instance