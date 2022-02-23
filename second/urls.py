from django.urls import path
from . import views

urlpatterns = [
    path('', views.second_view, name='second'),
]