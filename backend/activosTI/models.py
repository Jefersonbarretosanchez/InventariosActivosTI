"""Importaciones"""
from django.db import models
from django.contrib.auth.models import User


class Aplicaciones(models.Model):
    id_aplicacion = models.AutoField(primary_key=True)
    nombre_aplicativo = models.CharField(max_length=50)
    fecha_instalacion = models.DateField()

    class Meta:
        managed = False
        db_table = 'aplicaciones'


class AsignacionAplicaciones(models.Model):
    id_trabajador = models.ForeignKey('Persona', models.DO_NOTHING, db_column='id_trabajador', blank=True, null=True)
    id_aplicacion = models.ForeignKey(Aplicaciones, models.DO_NOTHING, db_column='id_aplicacion')

    class Meta:
        managed = False
        db_table = 'asignacion_aplicaciones'
        unique_together = (('id_trabajador', 'id_aplicacion'),)


class AsignacionEquipos(models.Model):
    id_asignacion = models.AutoField(primary_key=True)
    id_trabajador = models.ForeignKey('Persona', models.DO_NOTHING, db_column='id_trabajador', blank=True, null=True)
    id_equipo = models.ForeignKey('Equipo', models.DO_NOTHING, db_column='id_equipo', blank=True, null=True)
    fecha_entrega_equipo = models.DateField()
    fecha_devolucion_equipo = models.DateField()
    id_kit_perifericos = models.ForeignKey('KitPerifericos', models.DO_NOTHING, db_column='id_kit_perifericos', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'asignacion_equipos'


class AsignacionLicenciaPersona(models.Model):
    id_trabajador = models.ForeignKey('Persona', models.DO_NOTHING, db_column='id_trabajador', blank=True, null=True)
    id_licencia = models.ForeignKey('LicenciaPersona', models.DO_NOTHING, db_column='id_licencia')

    class Meta:
        managed = False
        db_table = 'asignacion_licencia_persona'
        unique_together = (('id_trabajador', 'id_licencia'),)


class AsignacionLicenciasEquipo(models.Model):
    id_equipo = models.ForeignKey('Equipo', models.DO_NOTHING, db_column='id_equipo')
    id_licencia_equipo = models.ForeignKey('LicenciasEquipo', models.DO_NOTHING, db_column='id_licencia_equipo')

    class Meta:
        managed = False
        db_table = 'asignacion_licencias_equipo'
        unique_together = (('id_equipo', 'id_licencia_equipo'),)


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
    fecha_registro = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'cat_area'
        
    def __str__(self):
        return str(self.nombre)

class CatCargo(models.Model):
    id_cargo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_cargo'
        
    def __str__(self):
        return str(self.nombre)


class CatCentroCosto(models.Model):
    id_centro_costo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'cat_centro_costo'
    
    def __str__(self):
        return str(self.nombre)


class CatCoordinadores(models.Model):
    id_coordinadores = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_coordinadores'


class CatDiscoduro(models.Model):
    id_discoduro = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_discoduro'


class CatEstadoLicenciaequipo(models.Model):
    id_estado_licencia = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_estado_licenciaequipo'


class CatEstadoLicenciapersona(models.Model):
    id_estado_licencia = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_estado_licenciapersona'


class CatEstadoPeriferico(models.Model):
    id_estado_periferico = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_estado_periferico'


class CatEstadoPersona(models.Model):
    id_estado_persona = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_estado_persona'
        
    def __str__(self):
        return str(self.nombre)


class CatEstadoequipo(models.Model):
    id_estadoequipo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_estadoequipo'


class CatMarcaequipo(models.Model):
    id_marcaequipo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_marcaequipo'


class CatMemoriaram(models.Model):
    id_ram = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_memoriaram'


class CatProcesador(models.Model):
    id_procesador = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_procesador'


class CatRegion(models.Model):
    id_region = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_region'
        
    def __str__(self):
        return str(self.nombre)


class CatSo(models.Model):
    id_so = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_so'


class CatTipoequipo(models.Model):
    id_tipoequipo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_tipoequipo'


class CatTipopropiedad(models.Model):
    id_tipopropiedad = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_tipopropiedad'


class CatUbicacion(models.Model):
    id_ubicacion = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()

    class Meta:
        managed = False
        db_table = 'cat_ubicacion'


class Contratos(models.Model):
    id_contrato = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    serial_contrato = models.CharField(max_length=50)
    fecha_inicio = models.DateField()
    fecha_vencimiento = models.DateField()
    cantidad_licencias = models.IntegerField()
    costo_unitario = models.IntegerField()
    costo_total = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'contratos'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
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
    procesador = models.CharField(max_length=50)
    costo = models.IntegerField()
    observacion = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'equipo'


class KitPerifericos(models.Model):
    id_kit_perifericos = models.AutoField(primary_key=True)
    id_perifericos = models.ForeignKey('Perifericos', models.DO_NOTHING, db_column='id_perifericos')

    class Meta:
        managed = False
        db_table = 'kit_perifericos'


class LicenciaArea(models.Model):
    id_licencia_area = models.AutoField(primary_key=True)
    nombre_licencia_area = models.CharField(max_length=50)
    estado_licencia_area = models.ForeignKey(CatEstadoLicenciapersona, models.DO_NOTHING, db_column='estado_licencia_area')
    id_contrato = models.ForeignKey(Contratos, models.DO_NOTHING, db_column='id_contrato')
    sereal = models.CharField(max_length=50)
    fecha_vencimiento = models.DateField()
    no_ticket = models.CharField(max_length=20)
    id_responsable = models.ForeignKey('Persona', models.DO_NOTHING, db_column='id_responsable')
    id_ceco = models.ForeignKey(CatCentroCosto, models.DO_NOTHING, db_column='id_ceco')
    cantidad = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'licencia_area'


class LicenciaPersona(models.Model):
    id_licencia = models.AutoField(primary_key=True)
    nombre_licencia = models.CharField(max_length=50)
    id_estado_licencia = models.ForeignKey(CatEstadoLicenciapersona, models.DO_NOTHING, db_column='id_estado_licencia')
    id_contrato = models.ForeignKey(Contratos, models.DO_NOTHING, db_column='id_contrato')
    no_ticket = models.CharField(max_length=20)
    id_solicitante = models.ForeignKey('Persona', models.DO_NOTHING, db_column='id_solicitante')

    class Meta:
        managed = False
        db_table = 'licencia_persona'


class LicenciasEquipo(models.Model):
    id_licencia_equipo = models.AutoField(primary_key=True)
    nombre_licencia = models.CharField(max_length=50)
    id_estado_licencia = models.ForeignKey(CatEstadoLicenciaequipo, models.DO_NOTHING, db_column='id_estado_licencia')
    sereal = models.CharField(max_length=30, blank=True, null=True)
    fecha_vencimiento = models.DateField(blank=True, null=True)
    no_ticket = models.CharField(max_length=20)
    id_solicitante = models.ForeignKey('Persona', models.DO_NOTHING, db_column='id_solicitante')
    id_contrato = models.ForeignKey(Contratos, models.DO_NOTHING, db_column='id_contrato', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'licencias_equipo'


class Perifericos(models.Model):
    id_perifericos = models.AutoField(primary_key=True)        
    nombre_periferico = models.CharField(max_length=30)        
    id_estado_periferico = models.ForeignKey(CatEstadoPeriferico, models.DO_NOTHING, db_column='id_estado_periferico')        
    modelo = models.CharField(max_length=30)
    sereal = models.CharField(max_length=30)
    costo = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'perifericos'


class Persona(models.Model):
    id_trabajador = models.AutoField(primary_key=True)
    identificacion = models.IntegerField(unique=True)
    nombres = models.CharField(max_length=30)
    apellidos = models.CharField(max_length=30)
    correo_personal = models.CharField(max_length=50,unique=True)
    correo_institucional = models.CharField(max_length=50,unique=True)
    id_centro_costo = models.ForeignKey(CatCentroCosto, models.DO_NOTHING, db_column='id_centro_costo')
    id_area = models.ForeignKey(CatArea, models.DO_NOTHING, db_column='id_area')
    id_region = models.ForeignKey(CatRegion, models.DO_NOTHING, db_column='id_region')
    id_cargo = models.ForeignKey(CatCargo, models.DO_NOTHING, db_column='id_cargo')
    fecha_ingreso_empresa = models.DateField()
    id_estado_persona = models.ForeignKey(CatEstadoPersona, models.DO_NOTHING, db_column='id_estado_persona')
    direccion = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'persona'


class UpgradeLicenciasArea(models.Model):
    id_licencia_area = models.ForeignKey(LicenciaArea, models.DO_NOTHING, db_column='id_licencia_area')
    numero_ticket = models.CharField(max_length=20)
    cant_solicitada = models.IntegerField()
    tipo_upgrade = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'upgrade_licencias_area'
        
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
    descripcion = models.CharField(max_length=200, verbose_name="Descripcion")

    class Meta:
        managed = False
        verbose_name_plural = 'Historicos'
        verbose_name = 'Historico'
        db_table = 'historicos'

    def __str__(self):
        return str(self.correo_usuario)