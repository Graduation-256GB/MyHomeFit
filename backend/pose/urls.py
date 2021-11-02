from django.urls import path, include
from . import views

app_name = 'pose'
urlpatterns = [
    path('exercise/', views.ListExercise.as_view()),
    path('set/exercise/', views.ListSetInExercise.as_view()),
    path('exercise/top/', views.TopListExercise.as_view()),
    path('set/rank/', views.TopListSet.as_view()),
    path('exercise/create/', views.exercise_create),
    path('exercise/<int:set_id>/update/', views.set_exercise_update),
    path('exercise/<int:pk>/', views.DetailExercise.as_view()),
    path('exerciseset/<int:pk>/', views.ListExerciseSet.as_view()),
    path('set/list/', views.ListSet.as_view()),
    path('set/create/', views.set_create),
    path('set/<int:set_id>/delete/', views.set_delete),
    path('set/<int:set_id>/update/', views.set_update),
    path('log/<int:pk>/', views.ListExerciseLogAPIView.as_view()),
    path('log/create/', views.log_create),
    path('user/current/', views.CurrentUserView.as_view()),
    path('user/rank/', views.UserRankView.as_view()),
    path('calendar/today/<int:year>/<int:month>/<int:day>/', views.ListTodayAPIView.as_view()),
    path('auth/', include('rest_auth.urls')),
    path('auth/register/', include('rest_auth.registration.urls')),
    # path('', views.index, name='index'),
    path('pose_feed/', views.pose_feed, name='pose_feed'),
    path('todos/', views.todo_list),
    path('todos/<int:pk>/', views.todo_detail),
]
