# Generated by Django 3.2.6 on 2021-09-13 08:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pose', '0003_exercise_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exerciseset',
            name='set',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='set', to='pose.set'),
        ),
    ]
