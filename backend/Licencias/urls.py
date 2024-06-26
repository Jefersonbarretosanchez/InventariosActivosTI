from django.urls import path
from . import views

urlpatterns = [
    path('licencias/persona/', views.LicenciaPersonaListCreate.as_view(),
         name="licencias_list_personas"),
    path('licencias/persona/<int:pk>/', views.LicenciaPersonaUpdate.as_view(),
         name='actualizacion_licencias_personas'),
    path('licencias/equipo/', views.LicenciasEquiposListCreate.as_view(),
         name="licencias_list_equipos"),
    path('licencias/equipo/<int:pk>/', views.LicenciasEquiposUpdate.as_view(),
         name='actualizacion_licencias_equipos'),
    path('licencias/area/', views.LicenciasAreasListCreate.as_view(),
         name="licencias_list_areas"),
    path('licencias/area/<int:pk>/', views.LicenciasAreasUpdate.as_view(),
         name='actualizacion_licencias_areas'),
    path('licencias/estado/', views.CatEstadoLicenciasListCreate.as_view(),
         name='estados_licencias'),
    path('licencias/contratos/', views.ContratosListCreate.as_view(),
         name='contratos_licencias'),
    path('licencias/contratos/<int:pk>/', views.ContratosUpdate.as_view(),
         name='actualizacion_contratos_licencias'),
    path('licencias/responsables/', views.PersonasLicenciasList.as_view(),
         name='lista_responsables'),
]
