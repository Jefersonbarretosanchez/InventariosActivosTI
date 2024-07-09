from django.db import models
from activosTI.models import Persona
# Create your models here.


class CatMarcaequipo(models.Model):
    id_marcaequipo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_marcaequipo'

    def __str__(self):
        return str(self.nombre)


class CatSo(models.Model):
    id_so = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        db_table = 'cat_so'

    def __str__(self):
        return str(self.nombre)


class CatMemoriaram(models.Model):
    id_ram = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_memoriaram'

    def __str__(self):
        return str(self.nombre)


class CatDiscoduro(models.Model):
    id_discoduro = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_discoduro'

    def __str__(self):
        return str(self.nombre)


class CatTipopropiedad(models.Model):
    id_tipopropiedad = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_tipopropiedad'

    def __str__(self):
        return str(self.nombre)


class CatTipoequipo(models.Model):
    id_tipoequipo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_tipoequipo'

    def __str__(self):
        return str(self.nombre)


class CatEstadoequipo(models.Model):
    id_estadoequipo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_estadoequipo'

    def __str__(self):
        return str(self.nombre)


class CatCoordinadores(models.Model):
    id_coordinadores = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_coordinadores'

    def __str__(self):
        return str(self.nombre)


class CatUbicacion(models.Model):
    id_ubicacion = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    fecha_registro = models.DateField()

    class Meta:
        db_table = 'cat_ubicacion'

    def __str__(self):
        return str(self.nombre)


class Equipo(models.Model):
    id_equipo = models.AutoField(primary_key=True)
    nombre_equipo = models.CharField(
        max_length=30, verbose_name='Nombre Equipo')
    modelo = models.CharField(max_length=30, verbose_name='Modelo')
    sereal = models.CharField(max_length=30, verbose_name='Serial')
    id_marcaequipo = models.ForeignKey(
        CatMarcaequipo, models.DO_NOTHING, db_column='id_marcaequipo', verbose_name='Marca Equipo')
    id_so = models.ForeignKey(
        CatSo, models.DO_NOTHING, db_column='id_so', verbose_name='Sistema Operativo')
    id_ram = models.ForeignKey(
        CatMemoriaram, models.DO_NOTHING, db_column='id_ram', verbose_name='Memoria RAM')
    id_discoduro = models.ForeignKey(
        CatDiscoduro, models.DO_NOTHING, db_column='id_discoduro', verbose_name='Disco Duro')
    anydesk = models.CharField(max_length=30, verbose_name='Anydesk')
    id_tipopropiedad = models.ForeignKey(
        CatTipopropiedad, models.DO_NOTHING, db_column='id_tipopropiedad', verbose_name='Tipo Propiedad')
    id_tipoequipo = models.ForeignKey(
        CatTipoequipo, models.DO_NOTHING, db_column='id_tipoequipo', verbose_name='Tipo Equipo')
    id_estadoequipo = models.ForeignKey(
        CatEstadoequipo, models.DO_NOTHING, db_column='id_estadoequipo', verbose_name='Estado')
    id_coordinadores = models.ForeignKey(
        CatCoordinadores, models.DO_NOTHING, db_column='id_coordinadores', verbose_name='Coordinador', blank=True, null=True)
    id_ubicacion = models.ForeignKey(
        CatUbicacion, models.DO_NOTHING, db_column='id_ubicacion', verbose_name='Ubicación Bodega', blank=True, null=True)
    procesador = models.CharField(max_length=100, verbose_name='Procesador')
    costo = models.IntegerField(verbose_name='Costo', blank=True, null=True)
    observacion = models.CharField(
        max_length=200, verbose_name='Observaciones', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'equipo'


    def __str__(self):
        return str(self.nombre_equipo)
        
class CatEstadoPeriferico(models.Model):
    id_estado_periferico = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField(auto_created=True)

    class Meta:
        db_table = 'cat_estado_periferico'
        
    def __str__(self):
        return str(self.nombre)


class Perifericos(models.Model):
    id_perifericos = models.AutoField(primary_key=True)
    nombre_periferico = models.CharField(max_length=30)
    id_estado_periferico = models.ForeignKey(
        CatEstadoPeriferico, models.DO_NOTHING, db_column='id_estado_periferico')
    modelo = models.CharField(max_length=30)
    sereal = models.CharField(max_length=30)
    costo = models.IntegerField()

    class Meta:
        db_table = 'perifericos'
        
    def __str__(self):
        return str(self.nombre_periferico)


class KitPerifericos(models.Model):
    id_kit_perifericos = models.AutoField(primary_key=True)
    perifericos = models.ManyToManyField(Perifericos, db_table='kit_perifericos_perifericos')

    class Meta:
        db_table = 'kit_perifericos'
        
    def __str__(self):
        return str(self.id_kit_perifericos)


class AsignacionEquipos(models.Model):
    id_asignacion = models.AutoField(primary_key=True)
    id_trabajador = models.ForeignKey(
        Persona, models.DO_NOTHING, db_column='id_trabajador')
    id_equipo = models.ForeignKey(
        Equipo, models.DO_NOTHING, db_column='id_equipo')
    fecha_entrega_equipo = models.DateField()
    fecha_devolucion_equipo = models.DateField(null=True)
    id_kit_perifericos = models.ForeignKey(
        KitPerifericos, models.DO_NOTHING, db_column='id_kit_perifericos', blank=True, null=True)

    class Meta:
        db_table = 'asignacion_equipos'
