# Generated by Django 5.0.5 on 2024-06-26 12:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('activosTI', '0040_delete_aplicaciones_delete_asignacionaplicaciones'),
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
            },
        ),
        migrations.CreateModel(
            name='AsignacionAplicaciones',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_aplicacion', models.ForeignKey(db_column='id_aplicacion', on_delete=django.db.models.deletion.DO_NOTHING, to='ComplementosActivos.aplicaciones')),
                ('id_trabajador', models.ForeignKey(blank=True, db_column='id_trabajador', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='activosTI.persona')),
            ],
            options={
                'db_table': 'asignacion_aplicaciones',
                'unique_together': {('id_trabajador', 'id_aplicacion')},
            },
        ),
    ]
