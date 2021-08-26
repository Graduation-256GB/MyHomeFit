from django.http.response import JsonResponse, HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics
from .serializers import ExerciseSerializer
from .models import Exercise


# def exercise_list(request):
#     serializer_class = ExerciseSerializer
#     queryset = Exercise.objects.all()
#     ctx={
#         queryset:queryset
#     }
#     return render(request, "index.tsx", ctx)

class ListExercise(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer


class DetailExercise(generics.RetrieveUpdateDestroyAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer


def keras_model(self):
    response = HttpResponse(open('/Users/sungeun/MyHomeFit+PoseEstimator/MyHomeFit/backend/config/users/model.json', "r"),
                            content_type='application/json', )
    return response
