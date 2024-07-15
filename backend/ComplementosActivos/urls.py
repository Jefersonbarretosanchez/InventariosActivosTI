from django.urls import path
from . import views

urlpatterns = [
    path('aplicaciones/',views.AplicacionesListCreate.as_view(),name="aplicaciones-list"),
    path('aplicaciones/<int:pk>/', views.AplicacionesUpdate.as_view(), name='aplicaciones-update'),
    path('aplicaciones/asignar/', views.AsignarApssView.as_view(), name='aplicaciones-asignacion'),
    path('aplicaciones/personas_sin_asignar/', views.PersonasSinAsignacionAppsViewSet.as_view(), name='personas-sin-asignacion'),
    path('aplicaciones/desasignar/<int:pk>/',views.DesasignarAppsView.as_view(), name='desasignar-aplicaciones'),
]