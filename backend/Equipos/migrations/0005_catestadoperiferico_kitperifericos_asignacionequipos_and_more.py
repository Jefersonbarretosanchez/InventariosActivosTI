# Generated by Django 5.0.5 on 2024-06-26 13:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Equipos', '0004_alter_catubicacion_nombre'),
        ('activosTI', '0041_delete_asignacionequipos_delete_catestadoperiferico_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='CatEstadoPeriferico',
            fields=[
                ('id_estado_periferico', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('fecha_registro', models.DateField()),
            ],
            options={
                'db_table': 'cat_estado_periferico',
            },
        ),
        migrations.CreateModel(
            name='KitPerifericos',
            fields=[
                ('id_kit_perifericos', models.AutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'kit_perifericos',
            },
        ),
        migrations.CreateModel(
            name='AsignacionEquipos',
            fields=[
                ('id_asignacion', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_entrega_equipo', models.DateField()),
                ('fecha_devolucion_equipo', models.DateField()),
                ('id_equipo', models.ForeignKey(blank=True, db_column='id_clsequipo', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='Equipos.equipo')),
                ('id_trabajador', models.ForeignKey(blank=True, db_column='id_trabajador', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='activosTI.persona')),
                ('id_kit_perifericos', models.ForeignKey(blank=True, db_column='id_kit_perifericos', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='Equipos.kitperifericos')),
            ],
            options={
                'db_table': 'asignacion_equipos',
            },
        ),
        migrations.CreateModel(
            name='Perifericos',
            fields=[
                ('id_perifericos', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_periferico', models.CharField(max_length=30)),
                ('modelo', models.CharField(max_length=30)),
                ('sereal', models.CharField(max_length=30)),
                ('costo', models.IntegerField()),
                ('id_estado_periferico', models.ForeignKey(db_column='id_estado_periferico', on_delete=django.db.models.deletion.DO_NOTHING, to='Equipos.catestadoperiferico')),
            ],
            options={
                'db_table': 'perifericos',
            },
        ),
        migrations.AddField(
            model_name='kitperifericos',
            name='id_perifericos',
            field=models.ForeignKey(db_column='id_perifericos', on_delete=django.db.models.deletion.DO_NOTHING, to='Equipos.perifericos'),
        ),
    ]
