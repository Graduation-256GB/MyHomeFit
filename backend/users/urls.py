from django.urls import path, include
from . import views


app_name = 'users'
urlpatterns = [
    path('users/', views.ListExercise.as_view()),
    path('users/<int:pk>/', views.DetailExercise.as_view()),
    path('auth/', include('rest_auth.urls')),
    path('auth/register/', include('rest_auth.registration.urls'))
]
