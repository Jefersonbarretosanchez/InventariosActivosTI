from django.db import models
from activosTI.models import Persona

# Create your models here.
class Aplicaciones(models.Model):
    id_aplicacion = models.AutoField(primary_key=True)
    nombre_aplicativo = models.CharField(max_length=50)
    fecha_instalacion = models.DateField()

    class Meta:
        db_table = 'aplicaciones'

class AsignacionAplicaciones(models.Model):
    id_trabajador = models.ForeignKey(Persona, models.DO_NOTHING, db_column='id_trabajador', blank=True, null=True)
    id_aplicacion = models.ForeignKey(Aplicaciones, models.DO_NOTHING, db_column='id_aplicacion')

    class Meta:
        db_table = 'asignacion_aplicaciones'
        unique_together = (('id_trabajador', 'id_aplicacion'),)