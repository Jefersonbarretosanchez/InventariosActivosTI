"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from activosTI.views import *
from cargamasiva.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


def home_redirect(request):
    return redirect('admin/')  # Redirige a una vista específica


urlpatterns = [
    path('', home_redirect, name='home'),

    path('admin/', admin.site.urls),
    path('catalogos/', catalogos, name='catalogos'),
    path('catalogos/carga_masiva/<str:catalogo>',CargaMasivaView.as_view(), name='carga_masiva'),
    # path('',include('activosTI.urls')),
    # path('auth/',obtain_auth_token),
    # path('',PersonaCreate.as_view(), name='create'),
    path('list/', PersonaLista.as_view(), name='list'),
    path('editar/<int:pk>/', PersonaUpdate.as_view(), name='editar'),
    path('eliminar/<int:pk>/', PersonaDelete.as_view(), name='eliminar'),
    #    path('api/login/', LoginView.as_view(), name='login'),

    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path('api/user/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path("api/token/", CustomTokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", MyTokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    # path('api/login/', LoginView.as_view(), name='login'),
    path("api/", include("activosTI.urls")),
    path("api/", include("Equipos.urls")),
    path("api/", include("Licencias.urls")),
    path("api/", include("ComplementosActivos.urls")),
]
