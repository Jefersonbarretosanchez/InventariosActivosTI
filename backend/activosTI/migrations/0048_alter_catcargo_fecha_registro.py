# Generated by Django 5.0.5 on 2024-07-16 13:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activosTI', '0047_alter_catcargo_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='catcargo',
            name='fecha_registro',
            field=models.DateField(),
        ),
    ]