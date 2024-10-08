"""Importaciones"""
from django.contrib.auth.models import User
from django.shortcuts import render
from django.urls import reverse_lazy

from rest_framework import generics, status, permissions
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import *
from activosTI.models import Historicos
from .serializers import *
from activosTI.views import PermisosApis

# Create your views here.

class AplicacionesListCreate(generics.ListCreateAPIView):
    serializer_class = AplicacionesSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]

    def get_queryset(self):
        return Aplicaciones.objects.all().order_by('-id_aplicacion')

    def perform_create(self, serializer):
        # Guardar la nueva Equipo
        Aplicaciones = serializer.save()

        # Intentar crear un registro en la tabla de historicos
        try:
            # Obtener el usuario si está disponible
            usuario = self.request.user if self.request.user.is_authenticated else None

            # Crear el registro en la tabla de historicos
            Historicos.objects.create(
                usuario=usuario,
                correo_usuario=usuario.email if usuario else 'anonimo@example.com',
                tipo_cambio="Creacion",
                tipo_activo="Aplicaciones",
                activo_modificado=Aplicaciones.nombre_aplicacion,
                descripcion=f'Se creó la aplicación "{
                    Aplicaciones.nombre_aplicacion}"'
            )
            print("Registro histórico creado exitosamente.")
        except Exception as e:
            # Manejar cualquier excepción aquí si es necesario
            print(f'Error al crear el registro histórico: {e}')

    def create(self, request, *args, **kwargs):
        print("Solicitud de creación recibida.")

        errors = {}
        if errors:
            return Response({'message': 'Error Al Crear la Aplicacion',  'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                'message': 'Error Al Crear la Aplicacion',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al crear la aplicacion'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AplicacionesUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Personas"""
    serializer_class = AplicacionesSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]
    queryset = Aplicaciones.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        errors = {}

        if errors:
            return Response({'message': 'Error Al Actualizar La Aplicacion', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                'message': 'Error Al Actualizar La Aplicacion',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar la aplicacion'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# vistas Asignacion Aplicaciones
class PersonasSinAsignacionAppsViewSet(generics.ListAPIView):
    queryset = Persona.objects.exclude(
        id_trabajador__in=AsignacionAplicaciones.objects.values_list('id_trabajador', flat=True))
    serializer_class = PersonaSinAsignacionAppSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]       
        
class AsignarApssView(generics.ListCreateAPIView):
    queryset = AsignacionAplicaciones.objects.all()
    serializer_class = AsignacionAppsPersonasSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]

    def perform_create(self, serializer):
        # Guardar la nueva asignación
        AsignacionAplicaciones = serializer.save()
        print("guarda Asignación")
        # Intentar crear un registro en la tabla de historicos
        try:
            # Obtener el usuario si está disponible
            print("Ingresa a Historico")
            usuario = self.request.user if self.request.user.is_authenticated else None

            # Crear el registro en la tabla de historicos
            Historicos.objects.create(
                usuario=usuario,
                correo_usuario=usuario.email if usuario else 'anonimo@example.com',
                tipo_cambio="Asignación",
                tipo_activo="Aplicación",
                activo_modificado=AsignacionAplicaciones.id_aplicacion.nombre_aplicacion,
                descripcion=f'Se asigno la licencia "{AsignacionAplicaciones.id_aplicacion.nombre_aplicacion} al trabajador {
                    AsignacionAplicaciones.id_trabajador.nombres} {AsignacionAplicaciones.id_trabajador.apellidos}"')
            print("Registro histórico creado exitosamente.")
        except Exception as e:
            # Manejar cualquier excepción aquí si es necesario
            print(f'Error al crear el registro histórico: {e}')

class DesasignarAppsView(generics.RetrieveUpdateAPIView):
    queryset = AsignacionAplicaciones.objects.all()
    serializer_class = DesAsignacionAppsSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        aplicacion = instance.id_aplicacion

        # Guardar valores originales antes de la actualización
        original_values = {            
        }

        

        # Guardar valores actualizados después de la actualización
        updated_values = {
        }

        # Registrar los cambios en el historial
        for field, original_value in original_values.items():
            current_value = updated_values[field]
            if original_value != current_value:
                verbose_name = Aplicaciones._meta.get_field(
                    field).verbose_name
                Historicos.objects.create(
                    usuario=self.request.user if self.request.user.is_authenticated else None,
                    correo_usuario=self.request.user.email if self.request.user.is_authenticated else 'anonimo@example.com',
                    tipo_cambio="Actualización",
                    tipo_activo="Aplicaciones",
                    activo_modificado=verbose_name,
                    descripcion=f'Cambio en {verbose_name}: de {original_value} a {
                        current_value} (Por Desasignacion Licencias)'
                )

        # Guardar el histórico de la desasignación
        Historicos.objects.create(
            usuario=self.request.user if self.request.user.is_authenticated else None,
            correo_usuario=self.request.user.email if self.request.user.is_authenticated else 'anonimo@example.com',
            tipo_cambio="Desasignación",
            tipo_activo="Licencia Equipo",
            activo_modificado=aplicacion.nombre_aplicativo,
            descripcion=f'Se elimino la asignación de la licencia "{aplicacion.nombre_aplicativo}" a {
                instance.id_trabajador.nombres}'
        )

        # Eliminar el registro de la tabla AsignacionEquipos después de desasignar el equipo
        instance.delete()

        return Response({"detail": "El aplicativo ha sido desasignado y el registro ha sido eliminado."}, status=status.HTTP_204_NO_CONTENT)
