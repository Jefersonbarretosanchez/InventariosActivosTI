# Generated by Django 5.0.5 on 2024-07-02 10:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Equipos', '0007_alter_asignacionequipos_fecha_devolucion_equipo_and_more'),
        ('activosTI', '0041_delete_asignacionequipos_delete_catestadoperiferico_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asignacionequipos',
            name='id_trabajador',
            field=models.ForeignKey(db_column='id_trabajador', on_delete=django.db.models.deletion.DO_NOTHING, to='activosTI.persona'),
        ),
    ]
