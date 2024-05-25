from django.urls import path
from . import views
# from .views import PersonaViewSet,UserViewSet
# from rest_framework.routers import DefaultRouter

# router=DefaultRouter()

# router.register('personas',PersonaViewSet, basename='personas')
# router.register('users',UserViewSet)

urlpatterns = [
    path('personas/',views.PersonaListCreate.as_view(),name="persona-list"),
    path("personas/delete/<int:pk>/",views.PersonasDelete.as_view(),name="delete-personas"),
    path('centro_costos/',views.CatCentroCostoViewSet.as_view(),name="centro-costos"),
]