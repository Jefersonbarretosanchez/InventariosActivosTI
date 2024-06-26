from django.db import models
from activosTI.models import Persona, CatCentroCosto
from Equipos.models import Equipo

# Create your models here.


class CatEstadoLicencias(models.Model):
    id_estado_licencia = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        db_table = 'cat_estado_licencia'

    def __str__(self):
        return str(self.nombre)


class Contratos(models.Model):
    id_contrato = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    sereal = models.CharField(max_length=50)
    fecha_inicio = models.DateField()
    fecha_vencimiento = models.DateField()
    cantidad_licencias = models.IntegerField()
    costo_unitario = models.IntegerField()
    costo_total = models.IntegerField()

    class Meta:
        db_table = 'contratos'

    def __str__(self):
        return str(self.nombre)


class LicenciaArea(models.Model):
    id_licencia = models.AutoField(primary_key=True)
    nombre_licencia = models.CharField(
        max_length=50, db_column='nombre_licencia', verbose_name='Nombre Licencia')
    id_estado_licencia = models.ForeignKey(
        CatEstadoLicencias, models.DO_NOTHING, db_column='estado_licencia')
    id_contrato = models.ForeignKey(
        Contratos, models.DO_NOTHING, db_column='id_contrato')
    sereal = models.CharField(
        max_length=50, db_column='sereal', verbose_name='Serial')
    fecha_vencimiento = models.DateField(
        db_column='fecha_vencimiento', verbose_name='Fecha Vencimiento')
    no_ticket = models.CharField(db_column='no_ticket', max_length=20)
    id_responsable = models.ForeignKey(
        Persona, models.DO_NOTHING, db_column='id_responsable', verbose_name='Responsable')
    id_centro_costo = models.ForeignKey(
        CatCentroCosto, models.DO_NOTHING, db_column='id_ceco', verbose_name='Centro de Costo')
    cantidad = models.IntegerField(verbose_name='Numero Licencias')

    class Meta:
        db_table = 'licencias_area'


class LicenciaPersona(models.Model):
    id_licencia = models.AutoField(primary_key=True)
    nombre_licencia = models.CharField(max_length=50)
    sereal = models.CharField(max_length=30, blank=True, null=True)
    fecha_vencimiento = models.DateField(blank=True, null=True)
    id_estado_licencia = models.ForeignKey(
        CatEstadoLicencias, models.DO_NOTHING, db_column='id_estado_licencia')
    id_contrato = models.ForeignKey(
        Contratos, models.DO_NOTHING, db_column='id_contrato')
    no_ticket = models.CharField(max_length=20)
    id_solicitante = models.ForeignKey(
        Persona, models.DO_NOTHING, db_column='id_solicitante')

    class Meta:
        db_table = 'licencia_persona'


class LicenciasEquipo(models.Model):
    id_licencia = models.AutoField(primary_key=True)
    nombre_licencia = models.CharField(max_length=50)
    id_estado_licencia = models.ForeignKey(
        CatEstadoLicencias, models.DO_NOTHING, db_column='id_estado_licencia')
    sereal = models.CharField(max_length=30, blank=True, null=True)
    fecha_vencimiento = models.DateField(blank=True, null=True)
    no_ticket = models.CharField(max_length=20)
    id_solicitante = models.ForeignKey(
        Persona, models.DO_NOTHING, db_column='id_solicitante')
    id_contrato = models.ForeignKey(
        Contratos, models.DO_NOTHING, db_column='id_contrato', blank=True, null=True)

    class Meta:
        db_table = 'licencias_equipo'


class UpgradeLicenciasArea(models.Model):
    id_licencia = models.ForeignKey(
        LicenciaArea, models.DO_NOTHING, db_column='id_licencia')
    numero_ticket = models.CharField(max_length=20)
    cant_solicitada = models.IntegerField()
    tipo_upgrade = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        db_table = 'upgrade_licencias_area'


class AsignacionLicenciaPersona(models.Model):
    id_trabajador = models.ForeignKey(
        Persona, models.DO_NOTHING, db_column='id_trabajador', blank=True, null=True)
    id_licencia = models.ForeignKey(
        LicenciaPersona, models.DO_NOTHING, db_column='id_licencia')

    class Meta:
        db_table = 'asignacion_licencia_persona'
        unique_together = (('id_trabajador', 'id_licencia'),)


class AsignacionLicenciasEquipo(models.Model):
    id_equipo = models.ForeignKey(
        Equipo, models.DO_NOTHING, db_column='id_equipo')
    id_licencia = models.ForeignKey(
        LicenciasEquipo, models.DO_NOTHING, db_column='id_licencia')

    class Meta:
        db_table = 'asignacion_licencias_equipo'
        unique_together = (('id_equipo', 'id_licencia'),)
