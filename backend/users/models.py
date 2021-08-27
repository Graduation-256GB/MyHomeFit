from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.fields import CharField


class Exercise(models.Model):
    exercise_name = models.CharField(max_length=50)
    calories = models.IntegerField()

    def __str__(self):
        return self.exercise_name


class CustomUser(AbstractUser):
    # Any extra fields would go here
    def __str__(self):
        return self.email
