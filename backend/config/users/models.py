from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.fields import CharField
from django.utils import timezone


class Exercise(models.Model):
    name = models.CharField(max_length=50)
    calories = models.IntegerField()
    img = models.ImageField(null=True, blank=True)
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)  # 추가된 시간
    # updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    # Any extra fields would go here
    def __str__(self):
        return self.username


class Set(models.Model):
    name = models.CharField(max_length=40)
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)


class ExerciseSet(models.Model):
    set_count = models.IntegerField()
    correct_count = models.IntegerField(default=0)
    fail_count = models.IntegerField(default=0)
    exercise = models.ForeignKey(
        Exercise, on_delete=models.SET_NULL, null=True)  # 운동 지울일이 있나..?
    set = models.ForeignKey(Set, on_delete=models.CASCADE)
    exercise_num = models.IntegerField()
    # created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)
    time_started = models.DateTimeField(blank=True, null=True)
    time_finished = models.DateTimeField(blank=True, null=True)
