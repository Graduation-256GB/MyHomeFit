# backend/post/admin.py
from django.contrib import admin
from .models import Exercise
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import CustomUser, Exercise, ExerciseSet, ExerciseLog, Set, Todo

admin.site.register(Exercise)
admin.site.register(ExerciseSet)
admin.site.register(ExerciseLog)
admin.site.register(Set)
admin.site.register(CustomUser)


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['username']
    list_display_links = ['username']

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'completed')

admin.site.register(Todo, TodoAdmin)