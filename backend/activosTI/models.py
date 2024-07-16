"""Importaciones"""
from django.db import models
from django.contrib.auth.models import User


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class AuthtokenToken(models.Model):
    key = models.CharField(primary_key=True, max_length=40)
    created = models.DateTimeField()
    user = models.OneToOneField(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'authtoken_token'


class CatArea(models.Model):
    id_area = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField(auto_now_add=True)

    class Meta:
        db_table = 'cat_area'

    def __str__(self):
        return str(self.nombre)


class CatCargo(models.Model):
    id_cargo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField(auto_now_add=True)

    class Meta:
        db_table = 'cat_cargo'

    def __str__(self):
        return str(self.nombre)


class CatCentroCosto(models.Model):
    id_centro_costo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField(auto_now_add=True)

    class Meta:
        db_table = 'cat_centro_costo'

    def __str__(self):
        return str(self.nombre)


class CatEstadoPersona(models.Model):
    id_estado_persona = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField(auto_now_add=True)

    class Meta:
        db_table = 'cat_estado_persona'

    def __str__(self):
        return str(self.nombre)


class CatRegion(models.Model):
    id_region = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField(auto_now_add=True)

    class Meta:
        db_table = 'cat_region'

    def __str__(self):
        return str(self.nombre)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey(
        'DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Persona(models.Model):
    id_trabajador = models.AutoField(primary_key=True)
    identificacion = models.IntegerField(
        unique=True, verbose_name='Numero Identificación')
    nombres = models.CharField(max_length=30, verbose_name='Nombres')
    apellidos = models.CharField(max_length=30, verbose_name='Apellidos')
    correo_personal = models.CharField(
        max_length=50, unique=True, verbose_name='Correo Personal')
    correo_institucional = models.CharField(
        max_length=50, unique=True, verbose_name='Correo Institucional')
    id_centro_costo = models.ForeignKey(
        CatCentroCosto, models.DO_NOTHING, db_column='id_centro_costo', verbose_name='Centro De Costo')
    id_area = models.ForeignKey(
        CatArea, models.DO_NOTHING, db_column='id_area', verbose_name='Area')
    id_region = models.ForeignKey(
        CatRegion, models.DO_NOTHING, db_column='id_region', verbose_name='Región')
    id_cargo = models.ForeignKey(
        CatCargo, models.DO_NOTHING, db_column='id_cargo', verbose_name="Cargo")
    fecha_ingreso_empresa = models.DateField(verbose_name='Fecha Ingreso')
    id_estado_persona = models.ForeignKey(
        CatEstadoPersona, models.DO_NOTHING, db_column='id_estado_persona', verbose_name='Estado')
    direccion = models.CharField(
        max_length=100, blank=True, null=True, verbose_name='Dirección Residencia')

    class Meta:
        managed = False
        db_table = 'persona'

    def __str__(self):
        return str(self.nombres) + ' ' + (self.apellidos)


class Historicos(models.Model):
    """Modulo de registros de Logs de cambios"""
    id_historico = models.AutoField(primary_key=True)
    fecha_registro = models.DateTimeField(
        auto_now_add=True, verbose_name="Fecha de Registro")
    usuario = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, verbose_name="Usuario")
    correo_usuario = models.EmailField(verbose_name="Correo Usuario")
    tipo_cambio = models.CharField(
        max_length=100, verbose_name="Tipo De Cambio")
    tipo_activo = models.CharField(max_length=100, verbose_name="Tipo Activo")
    activo_modificado = models.CharField(
        max_length=100, verbose_name="Activo Modificado")
    descripcion = models.CharField(max_length=500, verbose_name="Descripcion")

    class Meta:
        managed = False
        verbose_name_plural = 'Historicos'
        verbose_name = 'Historico'
        db_table = 'historicos'

    def __str__(self):
        return str(self.correo_usuario)
