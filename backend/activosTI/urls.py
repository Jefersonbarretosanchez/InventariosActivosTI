from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views
from .views import obtener_permisos_usuario


router = DefaultRouter()
# router.register(r'crear', CreacionUsuariosViewSet, basename='crear')
# router.register(r'actualizar', ActualizacionUsuariosViewSet, basename='actualizar')
# router.register(r'cambio', CambioContraseñaUsuarioView, basename='cambiar_contraseña')

urlpatterns = [
    path('log/', views.HistoricosList.as_view(), name="log"),
    path('personas/', views.PersonaListCreate.as_view(), name="persona-list"),
    path('personas/<int:pk>/', views.PersonasUpdate.as_view(), name='persona-update'),
    path('centro_costos/', views.CatCentroCostoViewSet.as_view(),
         name="centro-costos"),
    path('centro_costos/<int:pk>/', views.CatCentroCostoUpdate.as_view(),
         name="centro-costos-update"),
    path('area/', views.CatAreaViewSet.as_view(), name="areas"),
    path('area/<int:pk>/', views.CatAreaUpdate.as_view(), name="areas-update"),
    path('region/', views.CatRegionViewSet.as_view(), name="regiones"),
    path('region/<int:pk>/', views.CatRegionUpdate.as_view(), name="region-update"),
    path('cargo/', views.CatCargoViewSet.as_view(), name="cargos"),
    path('cargo/<int:pk>/', views.CatCargoUpdate.as_view(), name="cargo-update"),
    path('estado_persona/', views.CatEstadoPersonaViewSet.as_view(), name="estados"),
    path('estado_persona/<int:pk>/',
         views.CatEstadoPersonaUpdate.as_view(), name="estado_persona-update"),
    path('activos/', views.ActivosViewSet.as_view(), name="activos"),
    path('permisos/', obtener_permisos_usuario,
         name='obtener_permisos_usuario'),
    
    path('usuarios/crear/', views.CreacionUsuariosView.as_view(), name="crear_usuario"),
    path('usuarios/actualizar/<int:pk>/', views.ActualizacionUsuariosView.as_view(), name="actualizar_usuario"),
    path('usuarios/cambio/', views.CambioContraseñaUsuarioView.as_view(), name="cambio_contraseña"),
    path('usuarios/cambio/<int:pk>/', views.CambioContraseñaAdminView.as_view(), name="cambio_contraseña_admin"),
]
