# Generated by Django 5.0.5 on 2024-07-15 09:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Licencias', '0009_rename_id_ceco_licenciaarea_id_centro_costo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='licenciapersona',
            name='id_estado_licencia',
            field=models.ForeignKey(db_column='id_estado_licencia', on_delete=django.db.models.deletion.DO_NOTHING, to='Licencias.catestadolicencias', verbose_name='Estado Licencia'),
        ),
    ]