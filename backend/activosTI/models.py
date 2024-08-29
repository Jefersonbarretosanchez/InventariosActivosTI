"""Importaciones"""
from django.db import models
from django.contrib.auth.models import User

class CatArea(models.Model):
    id_area = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    fecha_registro = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural='Areas'
        verbose_name='area'
        db_table = 'cat_area'

    def __str__(self):
        return str(self.nombre)


class CatCargo(models.Model):
    id_cargo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    fecha_registro = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural='Cargos'
        verbose_name='cargo'
        db_table = 'cat_cargo'

    def __str__(self):
        return str(self.nombre)


class CatCentroCosto(models.Model):
    id_centro_costo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    fecha_registro = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural='Centros de Costo'
        verbose_name='centro costo'
        db_table = 'cat_centro_costo'

    def __str__(self):
        return str(self.nombre)


class CatEstadoPersona(models.Model):
    id_estado_persona = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural='Estado Personas'
        verbose_name='estado persona'
        db_table = 'cat_estado_persona'

    def __str__(self):
        return str(self.nombre)


class CatRegion(models.Model):
    id_region = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural='Regiones'
        verbose_name='region'
        db_table = 'cat_region'

    def __str__(self):
        return str(self.nombre)



class Persona(models.Model):
    id_trabajador = models.AutoField(primary_key=True)
    identificacion = models.CharField(max_length=30,verbose_name='Numero Identificación')
    nombres = models.CharField(max_length=30, verbose_name='Nombres')
    apellidos = models.CharField(max_length=30, verbose_name='Apellidos')
    correo_personal = models.CharField(max_length=50, verbose_name='Correo Personal', blank=True, null=True)
    correo_institucional = models.CharField(
        max_length=50, verbose_name='Correo Institucional')
    id_centro_costo = models.ForeignKey(
        CatCentroCosto, models.DO_NOTHING, db_column='id_centro_costo', verbose_name='Centro De Costo',default=1)
    id_area = models.ForeignKey(
        CatArea, models.DO_NOTHING, db_column='id_area', verbose_name='Area',default=1)
    id_region = models.ForeignKey(
        CatRegion, models.DO_NOTHING, db_column='id_region', verbose_name='Región',default=1)
    id_cargo = models.ForeignKey(
        CatCargo, models.DO_NOTHING, db_column='id_cargo', verbose_name="Cargo",default=1)
    fecha_ingreso_empresa = models.DateField(verbose_name='Fecha Ingreso')
    id_estado_persona = models.ForeignKey(
        CatEstadoPersona, models.DO_NOTHING, db_column='id_estado_persona', verbose_name='Estado',default=1)
    direccion = models.CharField(
        max_length=300, blank=True, null=True, verbose_name='Dirección Residencia',default="")

    class Meta:
        verbose_name_plural='Personas'
        verbose_name='persona'
        db_table = 'persona'

    def __str__(self):
        return str(self.nombres) + ' ' + (self.apellidos)


class Historicos(models.Model):
    """Modulo de registros de Logs de cambios"""
    id_historico = models.AutoField(primary_key=True)
    fecha_registro = models.DateTimeField(
        auto_now_add=True, verbose_name="Fecha de Registro")
    usuario = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, verbose_name="Usuario",default=1)
    correo_usuario = models.EmailField(verbose_name="Correo Usuario")
    tipo_cambio = models.CharField(
        max_length=100, verbose_name="Tipo De Cambio")
    tipo_activo = models.CharField(max_length=100, verbose_name="Tipo Activo")
    activo_modificado = models.CharField(
        max_length=100, verbose_name="Activo Modificado")
    descripcion = models.CharField(max_length=500, verbose_name="Descripcion")

    class Meta:
        verbose_name_plural = 'Historicos'
        verbose_name = 'Historico'
        db_table = 'historicos'

    def __str__(self):
        return str(self.correo_usuario)
