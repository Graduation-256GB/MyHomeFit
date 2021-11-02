from django.utils.timezone import localtime
from numpy.lib.function_base import trim_zeros
from pose.camera import PoseWebCam
from django.http.response import HttpResponse, JsonResponse, StreamingHttpResponse
from django.shortcuts import redirect, render
from rest_framework import viewsets
from rest_framework import generics
from .serializers import ExerciseSerializer, SetSerializer, ExerciseSetSerializer, UserSerializer, ExerciseInSetSerializer, ExerciseLogSerializer, TodoSerializer
from datetime import datetime, timezone
from django.utils.dateformat import DateFormat
from .models import Exercise, ExerciseSet, Set, CustomUser, ExerciseLog, Todo
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
import json
from rest_framework.response import Response
from rest_framework.views import APIView

# id랑 같은 인스턴스만 가져와서 만들어보기,,
# set의 id = ExerciseSet.set


class ListSetInExercise(generics.ListCreateAPIView):
    queryset = ExerciseSet.objects.all()
    # queryset = ExerciseSet.objects.
    serializer_class = ExerciseInSetSerializer


class ListExercise(generics.ListCreateAPIView):
    queryset = Exercise.objects.all().order_by('id')
    serializer_class = ExerciseSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class TopListExercise(generics.ListCreateAPIView):
    queryset = Exercise.objects.all().order_by('-selected_count')[:3]
    serializer_class = ExerciseSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class TopListSet(generics.ListCreateAPIView):
    queryset = Set.objects.all().order_by('-selected_count')[:5]
    serializer_class = SetSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class UserRankView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all().order_by('-user_count')[:5]
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class ListSet(generics.ListCreateAPIView):
    # queryset = Set.objects.filter(user=request.user)
    serializer_class = SetSerializer

    def get_queryset(self):
        current_user = self.request.user
        # print(self.request.user)
        # current_user = CustomUser.objects.get(email='abc@naver.com')
        return Set.objects.filter(user=current_user)


class DetailExercise(generics.RetrieveUpdateDestroyAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer


class ListExerciseSet(APIView):
    def get(self, request, pk):
        set = Set.objects.get(id=pk)
        serializer = ExerciseSetSerializer(
            ExerciseSet.objects.filter(set=set).order_by('set_num'), many=True)
        return Response(serializer.data)

class CurrentUserView(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


def index(request):
    return render(request, 'pose/home.html')


def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
# Create your views here.


def pose_feed(request):
    set_id = request.GET['set_id']
    speed_num = request.GET['speed_num']
    print(speed_num, set_id)
    return StreamingHttpResponse(gen(PoseWebCam(set_id, speed_num)),
                                 content_type='multipart/x-mixed-replace; boundary=frame')


def set_create(request):
    if request.method == 'POST':
        req = json.loads(request.body)
        set_title = req['title']
        set_type = req['type']
        ###set_date = DateFormat(datetime.now()).format('Y-m-d')
        #set_date = timezone.localtime()
        set_date = datetime.now()
        set = Set.objects.create(
            title=set_title, type=set_type, date=set_date, user=request.user)
    return JsonResponse({'set_id': set.pk})

def set_delete(request, set_id):
    Set.objects.get(pk=set_id).delete()
    return redirect('/makeyourset/')

def set_update(request, set_id):
    if request.method == 'POST':
        req = json.loads(request.body)
        set = Set.objects.get(pk=set_id)
        set.title = req['title']
        set.type = req['type']
        set.date = datetime.now()
        set.user=request.user
        set.save()
    return JsonResponse({'set_id': set_id})

def exercise_create(request):
    if request.method == 'POST':
        req = json.loads(request.body)
        for i in range(len(req)):
            set_id = req[i]['setId']
            exercise_id = req[i]['exerciseId']
            count = req[i]['count']
            exercise = Exercise.objects.get(id=exercise_id)
            set = Set.objects.get(id=set_id)
            exercise_set = ExerciseSet.objects.create(
                exercise=exercise, set=set, set_num=i+1, set_count=count)

    return JsonResponse({'exercise_set_id': exercise_set.id})

def set_exercise_update(request, set_id):
    if request.method == 'POST':
        user_set = Set.objects.get(pk=set_id)
        req = json.loads(request.body)
        print("req: ", req)
        ExerciseSet.objects.filter(set=user_set).delete()
        if 0 < len(req):
            for i in range(len(req)):
                set_id = user_set.id
                exercise_id = req[i]['exercise']
                count = req[i]['set_count']
                exercise = Exercise.objects.get(id=exercise_id)
                set = user_set
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


class ListExerciseLogAPIView(APIView):
    def get(self, request, pk):
        """
        serializer = ExerciseLogSerializer(
            ExerciseLog.objects.filter(set_exercise__set_id=pk), many=True)
        """
        log_list = []
        set_exercise_queryset = ExerciseSet.objects.filter(
            set=pk).order_by('set_num')
        for element in set_exercise_queryset:
            log_list.append(ExerciseLog.objects.filter(
                set_exercise_id=element.id).last())
            #log_list.append(ExerciseLog.objects.filter(user=1, set_exercise=element.id).last())
        serializer_exercise_log = ExerciseLogSerializer(log_list, many=True)

        return Response(serializer_exercise_log.data)


def log_create(request):
    if request.method == 'POST':
        req = json.loads(request.body)
        for i in range(len(req)):
            set_exercise_id = req[i]['id']
            print(set_exercise_id)
            time_started = datetime.now()
            set_exercise = ExerciseSet.objects.get(id=set_exercise_id)
            exercise_log = ExerciseLog.objects.create(
                set_exercise=set_exercise, correct_count=0, fail_count=0, time_started=time_started)

    return JsonResponse({'exercise_log_id': exercise_log.id})


class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()


todo_list = TodoViewSet.as_view({
    'get': 'list',
    'post': 'create',
})

todo_detail = TodoViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})


class ListTodayAPIView(APIView):
    def get(self, request, year, month, day):
        today_log_list = ExerciseLog.objects.filter(set_exercise__set__user=request.user, 
                            time_finished__year=year, time_finished__month=month, time_finished__day=day)
        serializer = ExerciseLogSerializer(today_log_list, many=True)

        print("[", year, "/", month, "/", day, "]", "객체들:", today_log_list)
        return Response(serializer.data)

