# Generated by Django 5.0.4 on 2024-04-24 19:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Aplicaciones',
            fields=[
                ('id_aplicacion', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_aplicativo', models.CharField(max_length=50)),
                ('fecha_instalacion', models.DateField()),
            ],
            options={
                'db_table': 'aplicaciones',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AsignacionAplicaciones',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'asignacion_aplicaciones',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AsignacionEquipos',
            fields=[
                ('id_asignacion', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_entrega_equipo', models.DateField()),
                ('fecha_devolucion_equipo', models.DateField()),
            ],
            options={
                'db_table': 'asignacion_equipos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AsignacionLicenciaPersona',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'asignacion_licencia_persona',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AsignacionLicenciasEquipo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'asignacion_licencias_equipo',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True)),
            ],
            options={
                'db_table': 'auth_group',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthGroupPermissions',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'auth_group_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthPermission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('codename', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'auth_permission',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('is_superuser', models.BooleanField()),
                ('username', models.CharField(max_length=150, unique=True)),
                ('first_name', models.CharField(max_length=150)),
                ('last_name', models.CharField(max_length=150)),
                ('email', models.CharField(max_length=254)),
                ('is_staff', models.BooleanField()),
                ('is_active', models.BooleanField()),
                ('date_joined', models.DateTimeField()),
            ],
            options={
                'db_table': 'auth_user',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUserGroups',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'auth_user_groups',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUserUserPermissions',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'auth_user_user_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatCentroCosto',
            fields=[
                ('id_centro_costo', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_centro_costo',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatArea',
            fields=[
                ('id_area', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_area',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatCargo',
            fields=[
                ('id_cargo', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_cargo',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatCoordinadores',
            fields=[
                ('id_coordinadores', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_coordinadores',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatDiscoduro',
            fields=[
                ('id_discoduro', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_discoduro',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatEstadoequipo',
            fields=[
                ('id_estadoequipo', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_estadoequipo',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatEstadoLicenciaequipo',
            fields=[
                ('id_estado_licencia', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_estado_licenciaequipo',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatEstadoLicenciapersona',
            fields=[
                ('id_estado_licencia', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_estado_licenciapersona',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatEstadoPeriferico',
            fields=[
                ('id_estado_periferico', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_estado_periferico',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatEstadoPersona',
            fields=[
                ('id_estado_persona', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_estado_persona',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatMarcaequipo',
            fields=[
                ('id_marcaequipo', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_marcaequipo',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatMemoriaram',
            fields=[
                ('id_ram', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_memoriaram',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatProcesador',
            fields=[
                ('id_procesador', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_procesador',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatRegion',
            fields=[
                ('id_region', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_region',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatSo',
            fields=[
                ('id_so', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_so',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatTipoequipo',
            fields=[
                ('id_tipoequipo', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_tipoequipo',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatTipopropiedad',
            fields=[
                ('id_tipopropiedad', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_tipopropiedad',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CatUbicacion',
            fields=[
                ('id_ubicacion', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'cat_ubicacion',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Contratos',
            fields=[
                ('id_contrato', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
                ('serial_contrato', models.CharField(max_length=50)),
                ('fecha_inicio', models.DateField()),
                ('fecha_vencimiento', models.DateField()),
                ('cantidad_licencias', models.IntegerField()),
            ],
            options={
                'db_table': 'contratos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoAdminLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action_time', models.DateTimeField()),
                ('object_id', models.TextField(blank=True, null=True)),
                ('object_repr', models.CharField(max_length=200)),
                ('action_flag', models.SmallIntegerField()),
                ('change_message', models.TextField()),
            ],
            options={
                'db_table': 'django_admin_log',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoContentType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app_label', models.CharField(max_length=100)),
                ('model', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'django_content_type',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoMigrations',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('app', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('applied', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_migrations',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoSession',
            fields=[
                ('session_key', models.CharField(max_length=40, primary_key=True, serialize=False)),
                ('session_data', models.TextField()),
                ('expire_date', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_session',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Equipo',
            fields=[
                ('id_equipo', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_equipo', models.CharField(max_length=30)),
                ('modelo', models.CharField(max_length=30)),
                ('sereal', models.CharField(max_length=30)),
                ('anydesk', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'equipo',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='HistoricoAsignacion',
            fields=[
                ('id_historico', models.AutoField(primary_key=True, serialize=False)),
                ('id_trabajador', models.IntegerField()),
                ('id_equipo', models.IntegerField()),
                ('id_licencia', models.IntegerField()),
                ('id_aplicacion', models.IntegerField()),
                ('fecha_modificacion', models.DateField()),
                ('usuario_modifico', models.CharField(max_length=30)),
                ('tipo_modificacion', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'historico_asignacion',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='HistoricoEquipos',
            fields=[
                ('id_historico', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
                ('registro_antiguo', models.CharField(max_length=30)),
                ('registro_nuevo', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'historico_equipos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='HistoricoLicencias',
            fields=[
                ('id_historico', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
                ('registro_antiguo', models.CharField(max_length=30)),
                ('registro_nuevo', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'historico_licencias',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='HistoricoPersonas',
            fields=[
                ('id_historico', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
                ('fecha_actualizacion', models.DateField()),
                ('usuario_registro', models.CharField(max_length=30)),
                ('usuario_actualizacion', models.CharField(max_length=30)),
                ('registro_antiguo', models.CharField(max_length=30)),
                ('registro_nuevo', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'historico_personas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='KitPerifericos',
            fields=[
                ('id_kit_perifericos', models.AutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'kit_perifericos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='LicenciaPersona',
            fields=[
                ('id_licencia', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_licencia', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'licencia_persona',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='LicenciasEquipo',
            fields=[
                ('id_licencia_equipo', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_licencia', models.CharField(max_length=50)),
                ('numero_contrato', models.CharField(blank=True, max_length=30, null=True)),
                ('sereal', models.CharField(blank=True, max_length=30, null=True)),
                ('fecha_vencimiento', models.DateField(blank=True, null=True)),
            ],
            options={
                'db_table': 'licencias_equipo',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Perifericos',
            fields=[
                ('id_perifericos', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_periferico', models.CharField(max_length=30)),
                ('modelo', models.CharField(max_length=30)),
                ('sereal', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'perifericos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Persona',
            fields=[
                ('id_trabajador', models.AutoField(primary_key=True, serialize=False)),
                ('identificacion', models.IntegerField()),
                ('nombres', models.CharField(max_length=30)),
                ('apellidos', models.CharField(max_length=30)),
                ('correo_personal', models.CharField(max_length=30)),
                ('correo_institucional', models.CharField(max_length=30)),
                ('fecha_ingreso_empresa', models.DateField()),
            ],
            options={
                'db_table': 'persona',
                'managed': False,
            },
        ),
    ]
