from django.db import models
from django.contrib.auth.models import User

class Alianza(models.Model):
    """Catalogo Alianzas"""
    nombre=models.CharField(max_length=100, verbose_name="Nombres")
    fechaRegistro=models.DateTimeField(auto_now_add=True)
    fechaActualizacion=models.DateTimeField(auto_now=True)
    user_create=models.ForeignKey(User, on_delete=models.PROTECT, verbose_name="Usuario Alta")
    #user_update=models.ForeignKey(User, on_delete=models.PROTECT, verbose_name="Usuario Actualiza")
    
    class Meta:
        verbose_name_plural='Alianzas'
        verbose_name='Alianza'
        db_table  = "cat_alianza"

class Persona(models.Model):
    """Class representing a Personas"""
    identificacion=models.CharField(max_length=100,verbose_name="# identificación")
    nombres=models.CharField(max_length=100, verbose_name="Nombres")
    apellidos=models.CharField(max_length=100,blank=False, verbose_name="Apellidos")
    correo_personal=models.EmailField(verbose_name="Correo Personal")
    correo_institucional=models.EmailField(null=True,blank=True,default='Sin Correo',verbose_name="Correo Institucional")
    alianza=models.ForeignKey(Alianza,null=True,blank=True,on_delete=models.PROTECT, verbose_name="Alianza")
    #area=models.ForeignKey(Area,null=True,blank=True,on_delete=models.PROTECT, verbose_name="Area")
    #region=models.ForeignKey(Region,null=True,blank=True,on_delete=models.PROTECT,verbose_name="Region")
    #estado=models.ForeignKey(Estado,null=True,blank=True,on_delete=models.PROTECT,verbose_name="Estado")
    #cargo=models.ForeignKey(Cargo,on_delete=models.PROTECT,verbose_name="Cargo")
    fecha_ingreso=models.DateField(verbose_name="Fecha Ingreso")
    fecharegistro=models.DateTimeField(auto_now_add=True,verbose_name="Fecha Registro BD")
    fecha_actualizacion=models.DateTimeField(auto_now=True,verbose_name="Fecha Actualización BD")
    user= models.ForeignKey(User, on_delete=models.CASCADE,verbose_name="Usuario")
    
    class Meta:
        verbose_name_plural='Personas'
        verbose_name='Persona'
        db_table  = "persona"
        
    def __str__(self):
        return str(self.nombres)
    #+ ' by ' + str(self.user.username)   