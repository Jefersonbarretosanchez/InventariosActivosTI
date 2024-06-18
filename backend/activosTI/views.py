"""Importaciones"""
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from rest_framework import generics, status,serializers
from rest_framework.permissions import IsAuthenticated, AllowAny

from .forms import PersonaCreacion, PersonaActualizar
from .serializers import UserSerializer, PersonaSerializer, CentroCostoSerializer, AreaSerializer, RegionSerializer, CargoSerializer, EstadoPersonaSerializer
from .models import Historicos, Persona, CatCentroCosto, CatArea, CatRegion, CatCargo, CatEstadoPersona

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
    serializer_class = PersonaSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Persona.objects.all().order_by('-id_trabajador')

    def perform_create(self, serializer):
        # Guardar la nueva persona
        persona = serializer.save()

        # Intentar crear un registro en la tabla de historicos
        try:
            # Obtener el usuario si está disponible
            usuario = self.request.user if self.request.user.is_authenticated else None

            # Crear el registro en la tabla de historicos
            Historicos.objects.create(
                usuario=usuario,
                correo_usuario=usuario.email if usuario else 'anonimo@example.com',
                tipo_cambio="Creacion",
                tipo_activo="Persona",
                activo_modificado=persona.id_trabajador,
                descripcion=f'Se creó el trabajador "{
                    persona.nombres} {persona.apellidos}"'
            )
            print("Registro histórico creado exitosamente.")
        except Exception as e:
            # Manejar cualquier excepción aquí si es necesario
            print(f'Error al crear el registro histórico: {e}')

    def create(self, request, *args, **kwargs):
        print("Solicitud de creación recibida.")
        try:
            response = super().create(request, *args, **kwargs)
            print("Respuesta de creación enviada.")
            return response
        except serializers.ValidationError as e:
            print(e)
            # Construir la respuesta personalizada
            errors = {}
            for field, messages in e.detail.items():
                errors[field] = messages[0]  # Tomamos el primer mensaje de error para cada campo
            customized_response = {
                'message': 'Error al crear la persona',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        # except serializers.ValidationError as e:
        #     return Response({"message": e.detail}, status=status.HTTP_400_BAD_REQUEST)


class PersonasUpdate(generics.RetrieveUpdateAPIView):
    """Actuaización Personas"""
    serializer_class = PersonaSerializer
    permission_classes = [AllowAny]
    queryset = Persona.objects.all()


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


class CatAreaViewSet(generics.ListCreateAPIView):
    queryset = CatArea.objects.all()
    serializer_class = AreaSerializer
    permission_classes = [AllowAny]


class CatRegionViewSet(generics.ListCreateAPIView):
    queryset = CatRegion.objects.all()
    serializer_class = RegionSerializer
    permission_classes = [AllowAny]


class CatCargoViewSet(generics.ListCreateAPIView):
    queryset = CatCargo.objects.all()
    serializer_class = CargoSerializer
    permission_classes = [AllowAny]


class CatEstadoPersonaViewSet(generics.ListCreateAPIView):
    queryset = CatEstadoPersona.objects.all()
    serializer_class = EstadoPersonaSerializer
    permission_classes = [AllowAny]