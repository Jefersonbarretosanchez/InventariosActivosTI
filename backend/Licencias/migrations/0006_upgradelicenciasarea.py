# Generated by Django 5.0.5 on 2024-06-24 21:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Licencias', '0005_licenciasequipo'),
    ]

    operations = [
        migrations.CreateModel(
            name='UpgradeLicenciasArea',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero_ticket', models.CharField(max_length=20)),
                ('cant_solicitada', models.IntegerField()),
                ('tipo_upgrade', models.CharField(blank=True, max_length=20, null=True)),
                ('id_licencia', models.ForeignKey(db_column='id_licencia', on_delete=django.db.models.deletion.DO_NOTHING, to='Licencias.licenciaarea')),
            ],
            options={
                'db_table': 'upgrade_licencias_area',
            },
        ),
    ]