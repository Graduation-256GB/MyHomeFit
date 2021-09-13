from django.urls import path, include
from . import views


app_name = 'pose'
urlpatterns = [
    path('pose/', views.ListExercise.as_view()),
    path('pose/<int:pk>/', views.DetailExercise.as_view()),
    path('exercise/', views.ListExercise.as_view()),
    path('set/exercise/', views.ListSetInExercise.as_view()),
    path('set/create/', views.set_create),
    path('set/list/', views.ListSet.as_view()),
    path('exercise/create/', views.exercise_create),
    path('auth/', include('rest_auth.urls')),
    path('auth/register/', include('rest_auth.registration.urls')),
    # path('', views.index, name='index'),
    path('pose_feed', views.pose_feed, name='pose_feed'),
]
