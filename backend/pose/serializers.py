from rest_framework import serializers
from .models import Exercise, ExerciseLog, ExerciseSet, Set
from .models import CustomUser, Todo, Calendar
import base64


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'last_login',
                  'date_joined', 'is_staff', 'profile_img')


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'


class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = '__all__'


class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = '__all__'


class ExerciseInSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseSet
        fields = '__all__'


class ExerciseSetSerializer(serializers.ModelSerializer):
    # exercise = ExerciseSerializer(many=True, read_only=True)
    # set = SetSerializer(many=True, read_only=True)
    img = serializers.ImageField(source="exercise.img")
    name = serializers.CharField(source="exercise.name")
    calories = serializers.IntegerField(source="exercise.calories")
    url = serializers.URLField(source="exercise.url")
    
    class Meta:
        model = ExerciseSet
        fields = ('id', 'exercise', 'set', 'set_num',
                  'set_count', 'created_at', 'img', 'name', 'calories', 'url')


class ExerciseLogSerializer(serializers.ModelSerializer):
    #user = UserSerializer(many=True, read_only=True)
    #set_exercise = ExerciseSetSerializer(many=True, read_only=True)
    calories = serializers.IntegerField(source="set_exercise.exercise.calories")
    class Meta:
        model = ExerciseLog
        fields = ('set_exercise', 'id', 'correct_count',
                  'fail_count', 'time_started', 'time_finished', 'calories')

# class ExerciseSetListSerializer(serializers.ModelSerializer):
#     exercise_set = ExerciseSetSerializer(many=True, read_only=True)

#     class Meta:
#         model = ExerciseSet
#         fields = '__all__'


class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = '__all__'

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed')
