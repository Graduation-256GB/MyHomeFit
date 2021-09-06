from pose.camera import PoseWebCam
from django.http.response import HttpResponse, JsonResponse, StreamingHttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics
from .serializers import ExerciseSerializer
from datetime import datetime
from django.utils.dateformat import DateFormat
from .models import Exercise, ExerciseSet, Set
import json


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


def index(request):
    return render(request, 'pose/home.html')


def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
# Create your views here.


def pose_feed(request):
    return StreamingHttpResponse(gen(PoseWebCam()),
                                 content_type='multipart/x-mixed-replace; boundary=frame')


def set_create(request):
    if request.method == 'POST':
        req = json.loads(request.body)
        set_title = req['title']
        set_type = req['type']
        set_date = DateFormat(datetime.now()).format('Y-m-d')
        set = Set.objects.create(
            title=set_title, type=set_type, date=set_date, user=request.user)
    return JsonResponse({'set_id': set.pk})


def exercise_create(request):
    if request.method == 'POST':
        req = json.loads(request.body)
        for i in range(len(req)):
            set_id = req[i]['setId']
            exercise_id = req[i]['id']
            count = req[i]['count']
            exercise = Exercise.objects.get(id=exercise_id)
            set = Set.objects.get(id=set_id)
            exercise_set = ExerciseSet.objects.create(
                exercise=exercise, set=set, set_num=i+1, set_count=count)

    return JsonResponse({'exercise_set_id': exercise_set.id})
