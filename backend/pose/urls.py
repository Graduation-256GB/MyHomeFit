from django.urls import path, include
from . import views


app_name = 'pose'
urlpatterns = [
    path('exercise/', views.ListExercise.as_view()),
    path('set/exercise/', views.ListSetInExercise.as_view()),
    # path('set/list/', views.ListSet.as_view()),
    path('exercise/create/', views.exercise_create),
    path('exercise/<int:pk>/', views.DetailExercise.as_view()),
    path('exerciseset/<int:pk>/', views.ListExerciseSet.as_view()),
    path('set/list/', views.SetListAPIView.as_view()),
    path('set/create/', views.set_create),
    path('log/<int:pk>/', views.ListExerciseLogAPIView.as_view()),
    path('log/create/', views.log_create),
    path('auth/', include('rest_auth.urls')),
    path('auth/register/', include('rest_auth.registration.urls')),
    # path('', views.index, name='index'),
    path('pose_feed/<int:pk>/', views.pose_feed, name='pose_feed'),
]
