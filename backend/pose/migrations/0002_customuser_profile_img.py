# Generated by Django 3.2.6 on 2021-09-25 08:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pose', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='profile_img',
            field=models.ImageField(blank=True, null=True, upload_to='uploads'),
        ),
    ]
