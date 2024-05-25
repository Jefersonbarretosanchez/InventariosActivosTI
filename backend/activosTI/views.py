"""Importaciones"""
from django.shortcuts import render
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny

from .forms import PersonaCreacion, PersonaActualizar
from .serializers import UserSerializer, PersonaSerializer,CentroCostoSerializer
from .models import HistoricoGeneral, Persona, CatCentroCosto

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

        HistoricoGeneral.objects.create(
            usuario=self.request.user,
            correo_usuario=self.request.user.email,
            tipo_cambio="Creacion",
            tipo_activo="Persona",
            activo_modificado=form.instance.id_trabajador,  # id de la persona
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
                    descripcion=f'Cambio en {field}: de {
                        original_value} a {current_value}'
                )
        return super().form_valid(form)


class PersonaDelete(DeleteView):
    """"Vista para eliminar Personas"""
    model = Persona
    template_name = 'persona_confirm_delete.html'
    success_url = reverse_lazy('list')


class PersonaListCreate(generics.ListCreateAPIView):
    """P"""
    serializer_class = PersonaSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        # user = self.request.user
        return Persona.objects.all().order_by('id_trabajador')


class PersonasDelete(generics.DestroyAPIView):
    """ND"""
    serializer_class = PersonaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Persona.objects.filter(nombres=user)


class CreateUserView(generics.CreateAPIView):
    """CU"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class CatCentroCostoViewSet(generics.ListCreateAPIView):
    queryset = CatCentroCosto.objects.all()
    serializer_class = CentroCostoSerializer
    permission_classes = [AllowAny]