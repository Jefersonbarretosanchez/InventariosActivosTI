"""Importaciones"""
from django.contrib.auth.models import User
from django.shortcuts import render
from django.urls import reverse_lazy

from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import *
from activosTI.models import Historicos
from .serializers import *

# Create your views here.

class EquipoListCreate(generics.ListCreateAPIView):
    serializer_class = EquipoSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Equipo.objects.all().order_by('-id_equipo')

    def perform_create(self, serializer):
        # Guardar la nueva Equipo
        Equipo = serializer.save()

        # Intentar crear un registro en la tabla de historicos
        try:
            # Obtener el usuario si está disponible
            usuario = self.request.user if self.request.user.is_authenticated else None

            # Crear el registro en la tabla de historicos
            Historicos.objects.create(
                usuario=usuario,
                correo_usuario=usuario.email if usuario else 'anonimo@example.com',
                tipo_cambio="Creacion",
                tipo_activo="Equipo",
                activo_modificado=Equipo.sereal,
                descripcion=f'Se creó el Equipo "{
                    Equipo.sereal}"'
            )
            print("Registro histórico creado exitosamente.")
        except Exception as e:
            # Manejar cualquier excepción aquí si es necesario
            print(f'Error al crear el registro histórico: {e}')

    def create(self, request, *args, **kwargs):
        print("Solicitud de creación recibida.")

        # Validaciones personalizadas
        sereal = request.data.get('sereal')

        errors = {}

        if Equipo.objects.filter(sereal=sereal).exists():
            errors["Serial"] = sereal

        if errors:
            return Response({'message': 'Error Al Crear El Equipo',  'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        try:
            response = super().create(request, *args, **kwargs)
            print("Respuesta de creación enviada.")
            return response
        except ValidationError as e:
            print(e)
            # Construir la respuesta personalizada
            errors = {field: [
                str(message)] for field, messages in e.detail.items() for message in messages}
            customized_response = {
                'message': 'Error al crear el Equipo',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al crear el Equipo'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EquiposUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Personas"""
    serializer_class = EquipoSerializer
    permission_classes = [AllowAny]
    queryset = Equipo.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Validaciones personalizadas
        sereal = request.data.get('sereal')

        errors = {}

        if Equipo.objects.filter(sereal=sereal).exclude(id_equipo=instance.id_equipo).exists():
            errors["Serial Equipo"] = sereal

        if errors:
            return Response({'message': 'Error Al Actualizar El Equipo', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)

        try:
            serializer.is_valid(raise_exception=True)
            # Guardar los valores originales antes de la actualización
            original_values = {field: getattr(instance, field) for field in serializer.validated_data}

            # Guardar los cambios actualizados
            self.perform_update(serializer)

            # Obtener los valores actualizados después de la actualización
            updated_instance = self.get_object()
            updated_values = {field: getattr(updated_instance, field) for field in serializer.validated_data}

            # Guardar los cambios en el historial
            for field, original_value in original_values.items():
                current_value = updated_values[field]
                if original_value != current_value:
                    verbose_name = updated_instance._meta.get_field(field).verbose_name
                    Historicos.objects.create(
                        usuario=self.request.user if self.request.user.is_authenticated else None,
                        correo_usuario=self.request.user.email if self.request.user.is_authenticated else 'anonimo@example.com',
                        tipo_cambio="Actualización",
                        tipo_activo="Equipo",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {verbose_name}: <b>de</b> {original_value} <b>a</b> {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error Al Actualizar El Equipo',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar la persona'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EquiposDelete(generics.DestroyAPIView):
    """ND"""
    serializer_class = EquipoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Equipo.objects.filter(nombres=user)

class CatMarcaEquipoViewSet(generics.ListCreateAPIView):
    queryset = CatMarcaequipo.objects.all()
    serializer_class = MarcaEquipoSerializer
    permission_classes = [AllowAny]

class CatSoViewSet(generics.ListCreateAPIView):
    queryset = CatSo.objects.all()
    serializer_class = SoSerializer
    permission_classes = [AllowAny]

class CatMRamViewSet(generics.ListCreateAPIView):
    queryset = CatMemoriaram.objects.all()
    serializer_class = MRamSerializer
    permission_classes = [AllowAny]

class CatDiscoDuroViewSet(generics.ListCreateAPIView):
    queryset = CatDiscoduro.objects.all()
    serializer_class = DiscoDuroSerializer
    permission_classes = [AllowAny]

class CatTipoPropiedadViewSet(generics.ListCreateAPIView):
    queryset = CatTipopropiedad.objects.all()
    serializer_class = TipoPropiedadSerializer
    permission_classes = [AllowAny]
    
class CatTipoEquipoViewSet(generics.ListCreateAPIView):
    queryset = CatTipoequipo.objects.all()
    serializer_class = TipoEquipoSerializer
    permission_classes = [AllowAny]
    
class CatEstadoEquipoViewSet(generics.ListCreateAPIView):
    queryset = CatEstadoequipo.objects.all()
    serializer_class = EstadoEquipoSerializer
    permission_classes = [AllowAny]
    
class CatCoordinadoresViewSet(generics.ListCreateAPIView):
    queryset = CatCoordinadores.objects.all()
    serializer_class = CoordinadoresSerializer
    permission_classes = [AllowAny]
    
class CatUbicacionViewSet(generics.ListCreateAPIView):
    queryset = CatUbicacion.objects.all()
    serializer_class = UbicacionSerializer
    permission_classes = [AllowAny]
