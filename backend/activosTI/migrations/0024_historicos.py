# Generated by Django 5.0.4 on 2024-04-26 12:49

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activosTI', '0023_delete_historicolicencias'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Historicos',
            fields=[
                ('id_historico', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_registro', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Registro')),
                ('correo_usuario', models.EmailField(max_length=254, verbose_name='Correo Usuario')),
                ('tipo_cambio', models.CharField(max_length=20, verbose_name='Tipo De Cambio')),
                ('tipo_activo', models.CharField(max_length=20, verbose_name='Tipo Activo')),
                ('activo_modificado', models.CharField(max_length=20, verbose_name='Activo Modificado')),
                ('descripcion', models.CharField(max_length=200, verbose_name='Descripcion')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL, verbose_name='Usuario')),
            ],
            options={
                'verbose_name': 'Historico',
                'verbose_name_plural': 'Historicos',
                'db_table': 'historico_general',
            },
        ),
    ]