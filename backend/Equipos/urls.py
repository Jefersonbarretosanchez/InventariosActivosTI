from django.urls import path
from . import views

urlpatterns = [
    path('equipos/',views.EquipoListCreate.as_view(),name="equipo-list"),
    path('equipos/<int:pk>/', views.EquiposUpdate.as_view(), name='equipo-update'),
    path("equipos/delete/<int:pk>/",views.EquiposDelete.as_view(),name="delete-equipos"),
    path('marca_equipo/',views.CatMarcaEquipoViewSet.as_view(),name="marca_equipos"),
    path('so/',views.CatSoViewSet.as_view(),name="so"),
    path('memoria_ram/',views.CatMRamViewSet.as_view(),name="memoria_ram"),
    path('disco_duro/',views.CatDiscoDuroViewSet.as_view(),name="disco_duro"),
    path('tipo_propiedad/',views.CatTipoPropiedadViewSet.as_view(),name="tipo_propiedad"),
    path('tipo_equipo/',views.CatTipoEquipoViewSet.as_view(),name="tipo_equipo"),
    path('estado_equipo/',views.CatEstadoEquipoViewSet.as_view(),name="estado_equipo"),
    path('coordinadores/',views.CatCoordinadoresViewSet.as_view(),name="coordinadores"),
    path('ubicaciones/',views.CatUbicacionViewSet.as_view(),name="ubicaciones"),
    path('asignar_equipo/', views.AsignarEquipoView.as_view(), name='asignar-equipo'),
    path('actualizar_asignacion_equipo/<int:pk>/', views.ActualizarAsignacionView.as_view(), name='actualizar_asignacion_equipo'),
    path('desasignar_equipo/<int:pk>/', views.DesasignarEquipoView.as_view(), name='desasignar-equipo'),
    path('equipos_asignacion/',views.EquiposAsignacionViewSet.as_view(),name="equipos_asignacion"),
    path('perifericos/', views.PerifericosListCreate.as_view(), name='perifericos_create'),
    path('perifericos/<int:pk>/', views.PerifericosUpdate.as_view(), name='perifericos_actualizar'),
    path('estado_perifericos/', views.EstadoPerifericosView.as_view(), name='estado_perifericos_create'),
    path('kit_perifericos/', views.KitPerifericosListCreateView.as_view(), name='kit_perifericos_create'),
    path('kit_perifericos/<int:pk>/', views.KitPerifericosDetailView.as_view(), name='kit_perifericos_detail'),
]