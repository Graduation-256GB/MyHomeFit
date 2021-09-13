from pose.camera import PoseWebCam
from django.http.response import HttpResponse, JsonResponse, StreamingHttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics
from .serializers import ExerciseSerializer, SetSerializer, ExerciseSetSerializer
from datetime import datetime
from django.utils.dateformat import DateFormat
from .models import Exercise, ExerciseSet, Set
import json
from rest_framework.response import Response
from rest_framework.views import APIView, View

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


class ListSet(generics.ListCreateAPIView):
    queryset = Set.objects.all()
    serializer_class = SetSerializer


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


class SetListAPIView(APIView):
    def get(self, request):
        serializer = SetSerializer(Set.objects.all(), many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class JoinAPIView(APIView):
    def get(self, request, set_id):
        exercises = []
        exercises_exercise = []

        entries = ExerciseSet.objects.filter(set_id=set_id).select_related('exercise_exercise').values('set_num','set_count', 'exercise__name', 'exercise__img', 'exercise__calories', 'exercise__url').order_by('set_num')

        for row in entries:
                    exercises.append({'set_num':row["set_num"], 'set_count':row["set_count"]})
                    exercises_exercise.append({'name':row["exercise__name"] , 'img':row["exercise__img"], 'calories':row["exercise__calories"], 'url':row["exercise__url"]})
                    print("row['exercise__img']: ", row["exercise__img"])
        #print("exercises: ", exercises)

        serializer_exercise_set = ExerciseSetSerializer(exercises, many=True)
        serializer_exercise = ExerciseSerializer(exercises_exercise, many=True)

        for row1 in serializer_exercise_set.data :
            for row2 in serializer_exercise.data :
                row1.update({'name': row2['name']})
                row1.update({'img': row2['img']})
                row1.update({'calories': row2['calories']})
                row1.update({'url': row2['url']})

        print("serializer_exercise_set.data: ", serializer_exercise_set.data)

        return Response(serializer_exercise_set.data)

