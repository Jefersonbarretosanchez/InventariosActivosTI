"""Importaciones"""
# from django.forms import BaseModelForm
# from django.http import HttpResponse
# from django.shortcuts import render,redirect
# from django.contrib.auth.mixins import LoginRequiredMixin
# from django.contrib.auth import authenticate
# from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import serializers
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.contrib.auth.models import User
from .forms import PersonaCreacion, PersonaActualizar
from .serializers import PersonaSerializer,UserSerializer
from .models import Historicos, Persona

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


# Create your views here.


class PersonaCreate(CreateView):
    """"Vista Persona"""
    model = Persona
    form_class = PersonaCreacion
    template_name = 'personaCreate.html'
    context_object_name = 'personas'
    success_url = reverse_lazy('list')

    def form_valid(self, form):
        response = super().form_valid(form)

        Historicos.objects.create(
            usuario=self.request.user,
            correo_usuario=self.request.user.email,
            tipo_cambio="Creacion",
            tipo_activo="Persona",
            activo_modificado=form.instance.id_trabajador,#id de la persona
            descripcion=f'Se creo el "trabajador" "{
                form.instance.nombres} {form.instance.apellidos}"'
        )
        return response

    # print(fecha_actual)


class PersonaLista(ListView):
    """Lista personas"""
    model = Persona
    template_name = 'persona.html'
    context_object_name = 'personas'


class PersonaUpdate(UpdateView):
    """Actualiza Requerimientos"""
    model = Persona
    form_class = PersonaActualizar
    template_name = 'personaEdit.html'
    context_object_name = 'reqs'
    success_url = reverse_lazy('list')

    def form_valid(self, form):
        if form.has_changed():
            for field in form.changed_data:
                original_value = form.initial[field]
                current_value = form.cleaned_data[field]
                Historicos.objects.create(
                    usuario=self.request.user,
                    correo_usuario=self.request.user.email,
                    tipo_cambio="Actualización",
                    tipo_activo="Persona",
                    activo_modificado=field,
                    # updated_field,  # Desempaqueta el diccionario con los detalles del campo
                    valor_anterior=original_value,
                    valor_nuevo=current_value,
                    descripcion=f'Cambio en {field}: de {original_value} a {current_value}'
                )
        return super().form_valid(form)

class PersonaDelete(DeleteView):
    """"Vista para eliminar Personas"""
    model = Persona
    template_name = 'persona_confirm_delete.html'
    success_url = reverse_lazy('list')
  
class UserViewSet(viewsets.ModelViewSet):
    """Clase de vista del usuario"""
    queryset=User.objects.all()
    serializer_class=UserSerializer
    
class PersonaViewSet(viewsets.ModelViewSet):
    """Clase vista persona API"""
    queryset=Persona.objects.all()
    serializer_class=PersonaSerializer
  
# class LoginView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)

#         user = authenticate(username=serializer.validated_data['email'], password=serializer.validated_data['password'])

#         if user:
#             token = RefreshToken.for_user(user)
#             return JSONResponse({
#                 'user': UserSerializer(user).data,
#                 'token': {
#                     'access': token.access_token,
#                     'refresh': token.refresh_token
#                 }
#             }, status=status.HTTP_200_OK)

#         return JSONResponse({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)