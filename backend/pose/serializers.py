from rest_framework import serializers
from .models import Exercise, ExerciseLog, ExerciseSet, Set
from .models import CustomUser
import base64


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'last_login', 'date_joined', 'is_staff')


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'


class ExerciseLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseLog
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
    img = serializers.ImageField(source='exercise.img')
    name = serializers.CharField(source='exercise.name')

    class Meta:
        model = ExerciseSet
        fields = ('exercise', 'name', 'set', 'set_num',
                  'set_count', 'created_at', 'img')

class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = '__all__'


class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = '__all__'
