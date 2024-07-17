from django.urls import path
from . import views
# from .views import PersonaViewSet,UserViewSet
# from rest_framework.routers import DefaultRouter

# router=DefaultRouter()

# router.register('personas',PersonaViewSet, basename='personas')
# router.register('users',UserViewSet)

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
]
