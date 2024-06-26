from django.urls import path
from . import views

urlpatterns = [
    path('aplicaciones/',views.AplicacionesListCreate.as_view(),name="aplicaciones-list"),
    path('aplicaciones/<int:pk>/', views.AplicacionesUpdate.as_view(), name='aplicaciones-update'),
]