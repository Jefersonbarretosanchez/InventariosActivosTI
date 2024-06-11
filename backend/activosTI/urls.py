from django.urls import path
from . import views
# from .views import PersonaViewSet,UserViewSet
# from rest_framework.routers import DefaultRouter

# router=DefaultRouter()

# router.register('personas',PersonaViewSet, basename='personas')
# router.register('users',UserViewSet)

urlpatterns = [
    path('personas/',views.PersonaListCreate.as_view(),name="persona-list"),
    path('personas/<int:pk>/', views.PersonasUpdate.as_view(), name='persona-update'),
    path("personas/delete/<int:pk>/",views.PersonasDelete.as_view(),name="delete-personas"),
    path('centro_costos/',views.CatCentroCostoViewSet.as_view(),name="centro-costos"),
    path('area/',views.CatAreaViewSet.as_view(),name="areas"),
    path('region/',views.CatRegionViewSet.as_view(),name="regiones"),
    path('cargo/',views.CatCargoViewSet.as_view(),name="cargos"),
    path('estado_persona/',views.CatEstadoPersonaViewSet.as_view(),name="estados"),
]