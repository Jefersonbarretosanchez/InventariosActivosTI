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
]