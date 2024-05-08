from django.urls import path,include
from .views import PersonaViewSet,UserViewSet
from rest_framework.routers import DefaultRouter

router=DefaultRouter()

router.register('personas',PersonaViewSet, basename='personas')
router.register('users',UserViewSet)

urlpatterns = [
    path('api/',include(router.urls)),
]