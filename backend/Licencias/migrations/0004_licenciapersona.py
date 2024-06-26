# Generated by Django 5.0.5 on 2024-06-24 21:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Licencias', '0003_licenciaarea'),
        ('activosTI', '0039_delete_asignacionlicenciapersona_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='LicenciaPersona',
            fields=[
                ('id_licencia', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_licencia', models.CharField(max_length=50)),
                ('sereal', models.CharField(blank=True, max_length=30, null=True)),
                ('fecha_vencimiento', models.DateField(blank=True, null=True)),
                ('no_ticket', models.CharField(max_length=20)),
                ('id_contrato', models.ForeignKey(db_column='id_contrato', on_delete=django.db.models.deletion.DO_NOTHING, to='Licencias.contratos')),
                ('id_estado_licencia', models.ForeignKey(db_column='id_estado_licencia', on_delete=django.db.models.deletion.DO_NOTHING, to='Licencias.catestadolicencias')),
                ('id_solicitante', models.ForeignKey(db_column='id_solicitante', on_delete=django.db.models.deletion.DO_NOTHING, to='activosTI.persona')),
            ],
            options={
                'db_table': 'licencia_persona',
            },
        ),
    ]
