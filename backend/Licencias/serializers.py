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


class PersonaSinAsignacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        # Incluye los campos necesarios
        fields = ['id_trabajador', 'nombres', 'apellidos']


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

# Serializadores Modulo asignaciones


class LicenciasPersonasAsigSerializer(serializers.ModelSerializer):
    class Meta:
        model = LicenciaPersona
        fields = ['id_licencia', 'nombre_licencia']


class AsignacionLicenciasPersonasSerializer(serializers.ModelSerializer):
    nombre_licencia = serializers.CharField(
        source='id_licencia.nombre_licencia', read_only=True)
    nombre_trabajador = serializers.CharField(
        source='id_trabajador.nombres', read_only=True)
    # ||Filtrar la licencias que esten sin asignarlas para mostrarlos en la lista.||
    # licenicas_en_stock=LicenciaPersona.objects.filter(id_licencia = CatEstadoLicencias.objects.get(nombre="Sin Asignar"))

    # ||Obtener la lista de trabajadores con asignaciones y excluirlos del listado que se muestra para asignar una licencia.||
    # trabajadores_con_asignaciones = AsignacionLicenciaPersona.objects.values_list('id_trabajador', flat=True)
    # trabajadores_sin_asignaciones = Persona.objects.exclude(id_trabajador__in=AsignacionLicenciaPersona.objects.values_list('id_trabajador', flat=True))

    # id_licencia = serializers.PrimaryKeyRelatedField(
    #     queryset=LicenciaPersona.objects.filter(id_estado_licencia = CatEstadoLicencias.objects.get(nombre="Sin Asignar"))
    # )

    # id_trabajador = serializers.PrimaryKeyRelatedField(
    #     queryset=Persona.objects.exclude(id_trabajador__in=AsignacionLicenciaPersona.objects.values_list('id_trabajador', flat=True)))

    class Meta:
        model = AsignacionLicenciaPersona
        fields = ['id', 'id_trabajador', 'nombre_trabajador',
                  'id_licencia', 'nombre_licencia']

    def validate(self, data):
        if self.instance is None:
            # Comprobar si la licencia ya está asignada
            asignacion_existente = AsignacionLicenciaPersona.objects.filter(
                id_licencia=data['id_licencia']).first()
            if asignacion_existente:
                usuario = asignacion_existente.id_trabajador
                raise serializers.ValidationError({"id_licencia": f"la licencia ya está asignada a {usuario.nombres} {usuario.apellidos} (ID: {usuario.id_trabajador}, Email: {usuario.correo_institucional})."}
                                                  )
            # Comprobar si el trabajador ya tiene una licencia asignada
            trabajador_asignacion = AsignacionLicenciaPersona.objects.filter(
                id_trabajador=data['id_trabajador']).first()
            if trabajador_asignacion:
                licencia = trabajador_asignacion.id_licencia
                raise serializers.ValidationError({"id_trabajador": f"El trabajador ya tiene una licencia asignada: {licencia.nombre_licencia} (ID: {licencia.id_licencia})."}
                                                  )
        else:
            # En la actualización, verificar si id_licencia ha cambiado y si el nuevo valor ya está asignado
            if 'id_trabajador' in data and self.instance.id_licencia != data['id_licencia']:
                asignacion_existente = AsignacionLicenciaPersona.objects.filter(
                    id_licencia=data['id_licencia']).first()
                if asignacion_existente:
                    usuario = asignacion_existente.id_trabajador
                    raise serializers.ValidationError(
                        f"La licencia ya está asignada a {usuario.nombres} {usuario.apellidos} (ID: {
                            usuario.id_trabajador}, Email: {usuario.correo_institucional})."
                    )
                trabajador_asignacion = AsignacionLicenciaPersona.objects.filter(
                    id_trabajador=data['id_trabajador']).first()
                if trabajador_asignacion:
                    licencia = trabajador_asignacion.id_licencia
                    raise serializers.ValidationError({"id_trabajador": f"El trabajador ya tiene una licencia asignada: {licencia.nombre_licencia} (ID: {licencia.id_licencia})."}
                                                      )
        return data

    def create(self, validated_data):
        lic_persona = validated_data['id_licencia']
        lic_persona.id_estado_licencia = CatEstadoLicencias.objects.get(
            nombre="Asignada")
        lic_persona.save()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class DesAsignacionLicenciasPersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsignacionLicenciaPersona
        fields = '__all__'

    def update(self, instance, validated_data):
        if 'id_licencia' in validated_data:
            lic_persona = validated_data['id_licencia']
            lic_persona.id_estado_licencia = CatEstadoLicencias.objects.get(
                nombre="Sin Asignar")
            lic_persona.save()
        return super().update(instance, validated_data)

# Serializadores asignación licencias Equipos


class LicenciasEquiposAsigSerializer(serializers.ModelSerializer):
    class Meta:
        model = LicenciasEquipo
        fields = ['id_licencia', 'nombre_licencia']


class AsignacionLicenciasEquiposSerializer(serializers.ModelSerializer):
    nombre_licencia = serializers.CharField(
        source='id_licencia.nombre_licencia', read_only=True)
    nombre_equipo = serializers.CharField(
        source='id_equipo.nombre_equipo', read_only=True)
    # ||Filtrar la licencias que esten sin asignarlas para mostrarlos en la lista.||
    # licencias_en_stock=LicenciasEquipo.objects.filter(id_licencia = CatEstadoLicencias.objects.get(nombre="Sin Asignar"))

    # ||Obtener la lista de trabajadores con asignaciones y excluirlos del listado que se muestra para asignar una licencia.||
    # trabajadores_con_asignaciones = AsignacionLicenciasEquipo.objects.values_list('id_trabajador', flat=True)
    # trabajadores_sin_asignaciones = Persona.objects.exclude(id_trabajador__in=AsignacionLicenciasEquipo.objects.values_list('id_trabajador', flat=True))

    # id_licencia = serializers.PrimaryKeyRelatedField(
    #     queryset=LicenciasEquipo.objects.filter(id_estado_licencia = CatEstadoLicencias.objects.get(nombre="Sin Asignar"))
    # )

    # id_equipo = serializers.PrimaryKeyRelatedField(
    #     queryset=Equipo.objects.exclude(id_equipo__in=AsignacionLicenciasEquipo.objects.values_list('id_equipo', flat=True)))

    class Meta:
        model = AsignacionLicenciasEquipo
        fields = ['id_asignacion', 'id_equipo', 'id_licencia']

    def validate(self, data):
        if self.instance is None:
            # Comprobar si la licencia ya está asignada
            asignacion_existente = AsignacionLicenciasEquipo.objects.filter(
                id_licencia=data['id_licencia']).first()
            if asignacion_existente:
                equipo = asignacion_existente.id_equipo
                raise serializers.ValidationError({"id_licencia": f"la licencia ya está asignada a {equipo.nombre_equipo} (ID: {equipo.id_equipo})."}
                                                  )
            # Comprobar si el equipo ya tiene una licencia asignada
            equipo_asignacion = AsignacionLicenciasEquipo.objects.filter(
                id_equipo=data['id_equipo']).first()
            if equipo_asignacion:
                licencia = equipo_asignacion.id_licencia
                raise serializers.ValidationError({"id_equipo": f"El equipo ya tiene una licencia asignada: {licencia.nombre_licencia} (ID: {licencia.id_licencia})."}
                                                  )
        else:
            # En la actualización, verificar si id_licencia ha cambiado y si el nuevo valor ya está asignado
            if 'id_equipo' in data and self.instance.id_licencia != data['id_licencia']:
                asignacion_existente = AsignacionLicenciasEquipo.objects.filter(
                    id_licencia=data['id_licencia']).first()
                if asignacion_existente:
                    equipo = asignacion_existente.id_equipo
                    raise serializers.ValidationError(
                        f"La licencia ya está asignada a {
                            equipo.nombre_equipo} (ID: {equipo.id_equipo})."
                    )
                equipo_asignacion = AsignacionLicenciasEquipo.objects.filter(
                    id_equipo=data['id_equipo']).first()
                if equipo_asignacion:
                    licencia = equipo_asignacion.id_licencia
                    raise serializers.ValidationError({"id_equipo": f"El equipo ya tiene una licencia asignada: {licencia.nombre_licencia} (ID: {licencia.id_licencia})."}
                                                      )
        return data

    def create(self, validated_data):
        equipo = validated_data['id_equipo']
        equipo.id_estado_licencia = CatEstadoLicencias.objects.get(
            nombre="Asignada")
        equipo.save()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class DesAsignacionLicEquSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsignacionLicenciasEquipo
        fields = '__all__'

    def update(self, instance, validated_data):
        if 'id_licencia' in validated_data:
            equipo = validated_data['id_licencia']
            equipo.id_estado_licencia = CatEstadoLicencias.objects.get(
                nombre="Sin Asignar")
            equipo.save()
        return super().update(instance, validated_data)
