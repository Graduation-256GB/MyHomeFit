# Generated by Django 3.2.6 on 2021-10-13 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pose', '0004_todo'),
    ]

    operations = [
        migrations.AddField(
            model_name='set',
            name='selected_count',
            field=models.IntegerField(default=0),
        ),
    ]
