from django.db import models

# Create your models here.


class Aplicaciones(models.Model):
    id_aplicacion = models.AutoField(primary_key=True)
    nombre_aplicativo = models.CharField(max_length=50)
    fecha_instalacion = models.DateField()

    class Meta:
        managed = False
        db_table = 'aplicaciones'


class AsignacionAplicaciones(models.Model):
    id_trabajador = models.ForeignKey(
        'Persona', models.DO_NOTHING, db_column='id_trabajador', blank=True, null=True)
    id_aplicacion = models.ForeignKey(
        Aplicaciones, models.DO_NOTHING, db_column='id_aplicacion')

    class Meta:
        managed = False
        db_table = 'asignacion_aplicaciones'
        unique_together = (('id_trabajador', 'id_aplicacion'),)


class AsignacionEquipos(models.Model):
    id_asignacion = models.AutoField(primary_key=True)
    id_trabajador = models.ForeignKey(
        'Persona', models.DO_NOTHING, db_column='id_trabajador', blank=True, null=True)
    id_equipo = models.ForeignKey(
        'Equipo', models.DO_NOTHING, db_column='id_equipo', blank=True, null=True)
    fecha_entrega_equipo = models.DateField()
    fecha_devolucion_equipo = models.DateField()
    id_kit_perifericos = models.ForeignKey(
        'KitPerifericos', models.DO_NOTHING, db_column='id_kit_perifericos', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'asignacion_equipos'


class AsignacionLicenciaPersona(models.Model):
    id_trabajador = models.ForeignKey(
        'Persona', models.DO_NOTHING, db_column='id_trabajador', blank=True, null=True)
    id_licencia = models.ForeignKey(
        'LicenciaPersona', models.DO_NOTHING, db_column='id_licencia')

    class Meta:
        managed = False
        db_table = 'asignacion_licencia_persona'
        unique_together = (('id_trabajador', 'id_licencia'),)


class AsignacionLicenciasEquipo(models.Model):
    id_equipo = models.ForeignKey(
        'Equipo', models.DO_NOTHING, db_column='id_equipo')
    id_licencia_equipo = models.ForeignKey(
        'LicenciasEquipo', models.DO_NOTHING, db_column='id_licencia_equipo')

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


class CatAlianza(models.Model):
    id_alianza = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cat_alianza'


class CatArea(models.Model):
    id_area = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cat_area'


class CatCargo(models.Model):
    id_cargo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cat_cargo'


class CatCoordinadores(models.Model):
    id_coordinadores = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cat_coordinadores'


class CatDiscoduro(models.Model):
    id_discoduro = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cat_discoduro'


class CatEstadoLicenciaequipo(models.Model):
    id_estado_licencia = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cat_estado_licenciaequipo'


class CatEstadoLicenciapersona(models.Model):
    id_estado_licencia = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cat_estado_licenciapersona'


class CatEstadoPeriferico(models.Model):
    id_estado_periferico = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cat_estado_periferico'


class CatEstadoPersona(models.Model):
    id_estado_persona = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cat_estado_persona'


class CatEstadoequipo(models.Model):
    id_estadoequipo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cat_estadoequipo'


class CatMarcaequipo(models.Model):
    id_marcaequipo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cat_marcaequipo'


class CatMemoriaram(models.Model):
    id_ram = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cat_memoriaram'


class CatProcesador(models.Model):
    id_procesador = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cat_procesador'


class CatRegion(models.Model):
    id_region = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cat_region'


class CatSo(models.Model):
    id_so = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cat_so'


class CatTipoequipo(models.Model):
    id_tipoequipo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cat_tipoequipo'


class CatTipopropiedad(models.Model):
    id_tipopropiedad = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cat_tipopropiedad'


class CatUbicacion(models.Model):
    id_ubicacion = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)

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

    class Meta:
        managed = False
        db_table = 'contratos'


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


class Equipo(models.Model):
    id_equipo = models.AutoField(primary_key=True)
    nombre_equipo = models.CharField(max_length=30)
    modelo = models.CharField(max_length=30)
    sereal = models.CharField(max_length=30)
    anydesk = models.CharField(max_length=30)
    marcaequipo = models.CharField(max_length=30)
    so = models.CharField(max_length=30)
    procesador = models.CharField(max_length=30)
    ram = models.CharField(max_length=30)
    disco_duro = models.CharField(max_length=30)
    tipo_propiedad = models.CharField(max_length=30)
    tipo_equipo = models.CharField(max_length=30)
    estado_equipo = models.CharField(max_length=30)
    coordinadores = models.CharField(max_length=30)
    ubicacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'equipo'


class HistoricoAsignacion(models.Model):
    id_historico = models.AutoField(primary_key=True)
    id_trabajador = models.IntegerField()
    id_equipo = models.IntegerField()
    id_licencia = models.IntegerField()
    id_aplicacion = models.IntegerField()
    fecha_modificacion = models.DateField()
    usuario_modifico = models.CharField(max_length=30)
    tipo_modificacion = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'historico_asignacion'


class HistoricoEquipos(models.Model):
    id_historico = models.AutoField(primary_key=True)
    id_equipo = models.ForeignKey(
        Equipo, models.DO_NOTHING, db_column='id_equipo')
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)
    registro_antiguo = models.CharField(max_length=30)
    registro_nuevo = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'historico_equipos'


class HistoricoLicencias(models.Model):
    id_historico = models.AutoField(primary_key=True)
    id_licencia = models.ForeignKey(
        'LicenciaPersona', models.DO_NOTHING, db_column='id_licencia')
    id_licencia_equipo = models.ForeignKey(
        'LicenciasEquipo', models.DO_NOTHING, db_column='id_licencia_equipo')
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)
    registro_antiguo = models.CharField(max_length=30)
    registro_nuevo = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'historico_licencias'


class HistoricoPersonas(models.Model):
    id_historico = models.AutoField(primary_key=True)
    id_trabajador = models.ForeignKey(
        'Persona', models.DO_NOTHING, db_column='id_trabajador')
    nombre = models.CharField(max_length=30)
    fecha_registro = models.DateField()
    fecha_actualizacion = models.DateField()
    usuario_registro = models.CharField(max_length=30)
    usuario_actualizacion = models.CharField(max_length=30)
    registro_antiguo = models.CharField(max_length=30)
    registro_nuevo = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'historico_personas'


class KitPerifericos(models.Model):
    id_kit_perifericos = models.AutoField(primary_key=True)
    id_perifericos = models.ForeignKey(
        'Perifericos', models.DO_NOTHING, db_column='id_perifericos')

    class Meta:
        managed = False
        db_table = 'kit_perifericos'


class LicenciaPersona(models.Model):
    id_licencia = models.AutoField(primary_key=True)
    nombre_licencia = models.CharField(max_length=50)
    id_contrato = models.ForeignKey(
        Contratos, models.DO_NOTHING, db_column='id_contrato')
    estado_licencia = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'licencia_persona'


class LicenciasEquipo(models.Model):
    id_licencia_equipo = models.AutoField(primary_key=True)
    nombre_licencia = models.CharField(max_length=50)
    numero_contrato = models.CharField(max_length=30, blank=True, null=True)
    sereal = models.CharField(max_length=30, blank=True, null=True)
    fecha_vencimiento = models.DateField(blank=True, null=True)
    estado_licencia = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'licencias_equipo'


class Perifericos(models.Model):
    id_perifericos = models.AutoField(primary_key=True)
    nombre_periferico = models.CharField(max_length=30)
    modelo = models.CharField(max_length=30)
    sereal = models.CharField(max_length=30)
    estado_periferico = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'perifericos'


class Persona(models.Model):
    id_trabajador = models.AutoField(primary_key=True)
    identificacion = models.IntegerField()
    nombres = models.CharField(max_length=30)
    apellidos = models.CharField(max_length=30)
    correo_personal = models.CharField(max_length=30)
    correo_institucional = models.CharField(max_length=30)
    fecha_ingreso_empresa = models.DateField()
    alianza = models.CharField(max_length=30)
    area = models.CharField(max_length=30)
    region = models.CharField(max_length=30)
    cargo = models.CharField(max_length=30)
    estado = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'persona'
