# Generated by Django 3.2.6 on 2021-10-14 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pose', '0006_alter_customuser_profile_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile_img',
            field=models.ImageField(blank=True, default='../media/uploads/user.png', null=True, upload_to='uploads'),
        ),
    ]
