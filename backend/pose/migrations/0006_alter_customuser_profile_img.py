# Generated by Django 3.2.6 on 2021-10-14 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pose', '0005_set_selected_count'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile_img',
            field=models.ImageField(blank=True, default='user.png', null=True, upload_to='uploads'),
        ),
    ]
