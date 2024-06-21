from django.db import models
from django.contrib.auth.models import User
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
    nombre_equipo = models.CharField(max_length=30)
    modelo = models.CharField(max_length=30)
    sereal = models.CharField(max_length=30)
    id_marcaequipo = models.ForeignKey(CatMarcaequipo, models.DO_NOTHING, db_column='id_marcaequipo')
    id_so = models.ForeignKey(CatSo, models.DO_NOTHING, db_column='id_so')
    id_ram = models.ForeignKey(CatMemoriaram, models.DO_NOTHING, db_column='id_ram')
    id_discoduro = models.ForeignKey(CatDiscoduro, models.DO_NOTHING, db_column='id_discoduro')
    anydesk = models.CharField(max_length=30)
    id_tipopropiedad = models.ForeignKey(CatTipopropiedad, models.DO_NOTHING, db_column='id_tipopropiedad')
    id_tipoequipo = models.ForeignKey(CatTipoequipo, models.DO_NOTHING, db_column='id_tipoequipo')
    id_estadoequipo = models.ForeignKey(CatEstadoequipo, models.DO_NOTHING, db_column='id_estadoequipo')
    id_coordinadores = models.ForeignKey(CatCoordinadores, models.DO_NOTHING, db_column='id_coordinadores')
    id_ubicacion = models.ForeignKey(CatUbicacion, models.DO_NOTHING, db_column='id_ubicacion')
    procesador = models.CharField(max_length=100)
    costo = models.IntegerField()
    observacion = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'equipo'