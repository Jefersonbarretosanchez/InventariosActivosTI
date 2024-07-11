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


class LicenciaPersonaListCreate(generics.ListCreateAPIView):
    serializer_class = LicenciaPersonasSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return LicenciaPersona.objects.all().order_by('-id_licencia')

    def perform_create(self, serializer):
        # Guardar la nueva Equipo
        LicenciaPersona = serializer.save()

        # Intentar crear un registro en la tabla de historicos
        try:
            # Obtener el usuario si está disponible
            usuario = self.request.user if self.request.user.is_authenticated else None

            # Crear el registro en la tabla de historicos
            Historicos.objects.create(
                usuario=usuario,
                correo_usuario=usuario.email if usuario else 'anonimo@example.com',
                tipo_cambio="Creacion",
                tipo_activo="Licencia Persona",
                activo_modificado=LicenciaPersona.sereal,
                descripcion=f'Se creó la licencia "{
                    LicenciaPersona.nombre_licencia}"'
            )
            print("Registro histórico creado exitosamente.")
        except Exception as e:
            # Manejar cualquier excepción aquí si es necesario
            print(f'Error al crear el registro histórico: {e}')

    def create(self, request, *args, **kwargs):
        print("Solicitud de creación recibida.")

        # Validaciones personalizadas
        # sereal = request.data.get('sereal')

        errors = {}

        # if LicenciaPersona.objects.filter(sereal=sereal).exists():
        #     errors["Serial"] = sereal

        if errors:
            return Response({'message': 'Error Al Crear La Licencia',  'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                'message': 'Error al crear la licencia',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al crear la licencia'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LicenciaPersonaUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Personas"""
    serializer_class = LicenciaPersonasSerializer
    permission_classes = [AllowAny]
    queryset = LicenciaPersona.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Validaciones personalizadas
        # sereal = request.data.get('sereal')

        errors = {}

        # if LicenciaPersona.objects.filter(sereal=sereal).exclude(id_licencia=instance.id_licencia).exists():
        #     errors["Serial"] = sereal

        if errors:
            return Response({'message': 'Error Al Actualizar la licencia', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)

        try:
            serializer.is_valid(raise_exception=True)
            # Guardar los valores originales antes de la actualización
            original_values = {field: getattr(
                instance, field) for field in serializer.validated_data}

            # Guardar los cambios actualizados
            self.perform_update(serializer)

            # Obtener los valores actualizados después de la actualización
            updated_instance = self.get_object()
            updated_values = {field: getattr(
                updated_instance, field) for field in serializer.validated_data}

            # Guardar los cambios en el historial
            for field, original_value in original_values.items():
                current_value = updated_values[field]
                if original_value != current_value:
                    verbose_name = updated_instance._meta.get_field(
                        field).verbose_name
                    Historicos.objects.create(
                        usuario=self.request.user if self.request.user.is_authenticated else None,
                        correo_usuario=self.request.user.email if self.request.user.is_authenticated else 'anonimo@example.com',
                        tipo_cambio="Actualización",
                        tipo_activo="Licencia Persona",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {
                            verbose_name}: <b>de</b> {original_value} <b>a</b> {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error al actualizar la licencia',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar la licencia'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LicenciasEquiposListCreate(generics.ListCreateAPIView):
    serializer_class = LicenciaEquiposSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return LicenciasEquipo.objects.all().order_by('-id_licencia')

    def perform_create(self, serializer):
        # Guardar la nueva Equipo
        LicenciasEquipo = serializer.save()

        # Intentar crear un registro en la tabla de historicos
        try:
            # Obtener el usuario si está disponible
            usuario = self.request.user if self.request.user.is_authenticated else None

            # Crear el registro en la tabla de historicos
            Historicos.objects.create(
                usuario=usuario,
                correo_usuario=usuario.email if usuario else 'anonimo@example.com',
                tipo_cambio="Creacion",
                tipo_activo="Licencia Equipo",
                activo_modificado=LicenciasEquipo.sereal,
                descripcion=f'Se creó la licencia "{
                    LicenciasEquipo.nombre_licencia}"'
            )
            print("Registro histórico creado exitosamente.")
        except Exception as e:
            # Manejar cualquier excepción aquí si es necesario
            print(f'Error al crear el registro histórico: {e}')

    def create(self, request, *args, **kwargs):
        print("Solicitud de creación recibida.")

        # Validaciones personalizadas
        # sereal = request.data.get('sereal')

        errors = {}

        # if LicenciasEquipo.objects.filter(sereal=sereal).exists():
        #     errors["Serial"] = sereal

        if errors:
            return Response({'message': 'Error Al Crear La Licencia',  'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                'message': 'Error al crear la licencia',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al crear la licencia'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LicenciasEquiposUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Personas"""
    serializer_class = LicenciaEquiposSerializer
    permission_classes = [AllowAny]
    queryset = LicenciasEquipo.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Validaciones personalizadas
        # sereal = request.data.get('sereal')

        errors = {}

        # if LicenciasEquipo.objects.filter(sereal=sereal).exclude(id_licencia=instance.id_licencia).exists():
        #     errors["Serial"] = sereal

        if errors:
            return Response({'message': 'Error Al Actualizar la licencia', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)

        try:
            serializer.is_valid(raise_exception=True)
            # Guardar los valores originales antes de la actualización
            original_values = {field: getattr(
                instance, field) for field in serializer.validated_data}

            # Guardar los cambios actualizados
            self.perform_update(serializer)

            # Obtener los valores actualizados después de la actualización
            updated_instance = self.get_object()
            updated_values = {field: getattr(
                updated_instance, field) for field in serializer.validated_data}

            # Guardar los cambios en el historial
            for field, original_value in original_values.items():
                current_value = updated_values[field]
                if original_value != current_value:
                    verbose_name = updated_instance._meta.get_field(
                        field).verbose_name
                    Historicos.objects.create(
                        usuario=self.request.user if self.request.user.is_authenticated else None,
                        correo_usuario=self.request.user.email if self.request.user.is_authenticated else 'anonimo@example.com',
                        tipo_cambio="Actualización",
                        tipo_activo="Licencia Equipo",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {
                            verbose_name}: <b>de</b> {original_value} <b>a</b> {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error al actualizar la licencia',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar la licencia'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LicenciasAreasListCreate(generics.ListCreateAPIView):
    serializer_class = LicenciaAreasSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return LicenciaArea.objects.all().order_by('-id_licencia')

    def perform_create(self, serializer):
        # Guardar la nueva Equipo
        LicenciaArea = serializer.save()

        # Intentar crear un registro en la tabla de historicos
        try:
            # Obtener el usuario si está disponible
            usuario = self.request.user if self.request.user.is_authenticated else None

            # Crear el registro en la tabla de historicos
            Historicos.objects.create(
                usuario=usuario,
                correo_usuario=usuario.email if usuario else 'anonimo@example.com',
                tipo_cambio="Creacion",
                tipo_activo="Licencia Area",
                activo_modificado=LicenciaArea.sereal,
                descripcion=f'Se creó la licencia "{
                    LicenciaArea.nombre_licencia}"'
            )
            print("Registro histórico creado exitosamente.")
        except Exception as e:
            # Manejar cualquier excepción aquí si es necesario
            print(f'Error al crear el registro histórico: {e}')

    def create(self, request, *args, **kwargs):
        print("Solicitud de creación recibida.")

        # Validaciones personalizadas
        # sereal = request.data.get('sereal')

        errors = {}

        if errors:
            return Response({'message': 'Error Al Crear La Licencia',  'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                'message': 'Error al crear la licencia',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al crear la licencia'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LicenciasAreasUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Personas"""
    serializer_class = LicenciaAreasSerializer
    permission_classes = [AllowAny]
    queryset = LicenciaArea.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Validaciones personalizadas
        # sereal = request.data.get('sereal')

        errors = {}

        # if LicenciaArea.objects.filter(sereal=sereal).exclude(id_licencia=instance.id_licencia).exists():
        #     errors["Serial"] = sereal

        if errors:
            return Response({'message': 'Error Al Actualizar la licencia', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)

        try:
            serializer.is_valid(raise_exception=True)
            # Guardar los valores originales antes de la actualización
            original_values = {field: getattr(
                instance, field) for field in serializer.validated_data}

            # Guardar los cambios actualizados
            self.perform_update(serializer)

            # Obtener los valores actualizados después de la actualización
            updated_instance = self.get_object()
            updated_values = {field: getattr(
                updated_instance, field) for field in serializer.validated_data}

            # Guardar los cambios en el historial
            for field, original_value in original_values.items():
                current_value = updated_values[field]
                if original_value != current_value:
                    verbose_name = updated_instance._meta.get_field(
                        field).verbose_name
                    Historicos.objects.create(
                        usuario=self.request.user if self.request.user.is_authenticated else None,
                        correo_usuario=self.request.user.email if self.request.user.is_authenticated else 'anonimo@example.com',
                        tipo_cambio="Actualización",
                        tipo_activo="Licencia Equipo",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {
                            verbose_name}: <b>de</b> {original_value} <b>a</b> {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error al actualizar la licencia',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar la licencia'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CatEstadoLicenciasListCreate(generics.ListCreateAPIView):
    queryset = CatEstadoLicencias.objects.all()
    serializer_class = EstadoLicenciasSerializer
    permission_classes = [AllowAny]


class ContratosListCreate(generics.ListCreateAPIView):
    serializer_class = ContratosSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Contratos.objects.all().order_by('-id_contrato')

    def perform_create(self, serializer):
        # Guardar la nueva Equipo
        Contratos = serializer.save()

        # Intentar crear un registro en la tabla de historicos
        try:
            # Obtener el usuario si está disponible
            usuario = self.request.user if self.request.user.is_authenticated else None

            # Crear el registro en la tabla de historicos
            Historicos.objects.create(
                usuario=usuario,
                correo_usuario=usuario.email if usuario else 'anonimo@example.com',
                tipo_cambio="Creacion",
                tipo_activo="Contrato Licencias",
                activo_modificado=Equipo.sereal,
                descripcion=f'Se creó el contrato "{
                    Contratos.nombre}"'
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

        if Contratos.objects.filter(sereal=sereal).exists():
            errors["Serial"] = sereal

        if errors:
            return Response({'message': 'Error Al Crear El Contrato',  'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                'message': 'Error al crear el contrato',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al crear el contrato'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ContratosUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Personas"""
    serializer_class = ContratosSerializer
    permission_classes = [AllowAny]
    queryset = Contratos.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Validaciones personalizadas
        sereal = request.data.get('sereal')

        errors = {}

        if Contratos.objects.filter(sereal=sereal).exclude(id_contrato=instance.id_contrato).exists():
            errors["Serial"] = sereal

        if errors:
            return Response({'message': 'Error Al Actualizar El Contrato', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)

        try:
            serializer.is_valid(raise_exception=True)
            # Guardar los valores originales antes de la actualización
            original_values = {field: getattr(
                instance, field) for field in serializer.validated_data}

            # Guardar los cambios actualizados
            self.perform_update(serializer)

            # Obtener los valores actualizados después de la actualización
            updated_instance = self.get_object()
            updated_values = {field: getattr(
                updated_instance, field) for field in serializer.validated_data}

            # Guardar los cambios en el historial
            for field, original_value in original_values.items():
                current_value = updated_values[field]
                if original_value != current_value:
                    verbose_name = updated_instance._meta.get_field(
                        field).verbose_name
                    Historicos.objects.create(
                        usuario=self.request.user if self.request.user.is_authenticated else None,
                        correo_usuario=self.request.user.email if self.request.user.is_authenticated else 'anonimo@example.com',
                        tipo_cambio="Actualización",
                        tipo_activo="Contratos Licencias",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {
                            verbose_name}: <b>de</b> {original_value} <b>a</b> {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error al actualizar el contrato',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar el contrato'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PersonasLicenciasList(generics.ListAPIView):
    queryset = Persona.objects.all()
    serializer_class = PersonaLicenciasSerializers
    permission_classes = [AllowAny]

# Vistas Asignación Licencias


class LicenciasPersonasAsignacionViewSet(generics.ListAPIView):
    queryset = LicenciaPersona.objects.all()
    serializer_class = LicenciasPersonasAsigSerializer
    permission_classes = [AllowAny]


class AsignarLicenciaPersonaView(generics.ListCreateAPIView):
    queryset = AsignacionLicenciaPersona.objects.all()
    serializer_class = AsignacionLicenciasPersonasSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        # Guardar la nueva asignación
        AsignacionLicencias = serializer.save()
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
                tipo_activo="Licencia Trabajador",
                activo_modificado=AsignacionLicencias.id_licencia.nombre_licencia,
                descripcion=f'Se asigno la licencia "{AsignacionLicencias.id_licencia.nombre_licencia} a {
                    AsignacionLicencias.id_trabajador.nombres} {AsignacionLicencias.id_trabajador.apellidos}"')
            print("Registro histórico creado exitosamente.")
        except Exception as e:
            # Manejar cualquier excepción aquí si es necesario
            print(f'Error al crear el registro histórico: {e}')


# class ActualizarAsignacionLicPerView(generics.RetrieveUpdateAPIView):
#     serializer_class = AsignacionLicenciasPersonasSerializer
#     permission_classes = [AllowAny]
#     queryset = AsignacionLicenciaPersona.objects.all()

#     def update(self, request, *args, **kwargs):
#         partial = kwargs.pop('partial', False)
#         instance = self.get_object()
#         serializer = self.get_serializer(
#             instance, data=request.data, partial=partial)

#         if serializer.is_valid():

#             # Guardar los valores originales antes de la actualización
#             original_values = {field: getattr(
#                 instance, field) for field in serializer.validated_data}

#             # Guardar los cambios actualizados
#             self.perform_update(serializer)

#             # Obtener los valores actualizados después de la actualización
#             updated_instance = self.get_object()
#             updated_values = {field: getattr(
#                 updated_instance, field) for field in serializer.validated_data}

#             # Guardar los cambios en el historial
#             for field, original_value in original_values.items():
#                 current_value = updated_values[field]
#                 if original_value != current_value:
#                     verbose_name = updated_instance._meta.get_field(
#                         field).verbose_name
#                     Historicos.objects.create(
#                         usuario=self.request.user if self.request.user.is_authenticated else None,
#                         correo_usuario=self.request.user.email if self.request.user.is_authenticated else 'anonimo@example.com',
#                         tipo_cambio="Actualización",
#                         tipo_activo="Asignación Licencia Trabajador",
#                         activo_modificado=verbose_name,
#                         descripcion=f'Cambio en {verbose_name}: de {
#                             original_value} a {current_value}'
#                     )

#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DesasignarLicPerView(generics.RetrieveUpdateAPIView):
    queryset = AsignacionLicenciaPersona.objects.all()
    serializer_class = DesAsignacionLicenciasPersonaSerializer
    permission_classes = [AllowAny]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        LicPersona = instance.id_licencia

        # Guardar valores originales antes de la actualización
        original_values = {
            'id_estado_licencia': LicPersona.id_estado_licencia,
        }

        # Actualizar el equipo
        LicPersona.id_estado_licencia = CatEstadoLicencias.objects.get(
            nombre="Sin Asignar")
        LicPersona.save()

        # Guardar valores actualizados después de la actualización
        updated_values = {
            'id_estado_licencia': LicPersona.id_estado_licencia,
        }

        # Registrar los cambios en el historial
        for field, original_value in original_values.items():
            current_value = updated_values[field]
            if original_value != current_value:
                verbose_name = LicenciaPersona._meta.get_field(
                    field).verbose_name
                Historicos.objects.create(
                    usuario=self.request.user if self.request.user.is_authenticated else None,
                    correo_usuario=self.request.user.email if self.request.user.is_authenticated else 'anonimo@example.com',
                    tipo_cambio="Actualización",
                    tipo_activo="Licencia Trabajador",
                    activo_modificado=verbose_name,
                    descripcion=f'Cambio en {verbose_name}: de {original_value} a {
                        current_value} (Por Desasignacion Licencias)'
                )

        # Guardar el histórico de la desasignación
        Historicos.objects.create(
            usuario=self.request.user if self.request.user.is_authenticated else None,
            correo_usuario=self.request.user.email if self.request.user.is_authenticated else 'anonimo@example.com',
            tipo_cambio="Desasignación",
            tipo_activo="Licencia Trabajador",
            activo_modificado=LicPersona.nombre_licencia,
            descripcion=f'Se elimino la asignación de la licencia "{LicPersona.nombre_licencia}" a {
                instance.id_trabajador.nombres} {instance.id_trabajador.apellidos}'
        )

        # Eliminar el registro de la tabla AsignacionLicenciasPersonas después de desasignar el equipo
        instance.delete()

        return Response({"detail": "La licencia ha sido desasignado y el registro ha sido eliminado."}, status=status.HTTP_204_NO_CONTENT)
# vistas APIs asignación licencias Equipos
class AsignarLicenciaEquiposView(generics.ListCreateAPIView):
    queryset = AsignacionLicenciasEquipo.objects.all()
    serializer_class = AsignacionLicenciasEquiposSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        # Guardar la nueva asignación
        AsignacionLicencias = serializer.save()
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
                tipo_activo="Licencia Equipo",
                activo_modificado=AsignacionLicencias.id_licencia.nombre_licencia,
                descripcion=f'Se asigno la licencia "{AsignacionLicencias.id_licencia.nombre_licencia} al equipo {
                    AsignacionLicencias.id_equipo.nombre_equipo}"')
            print("Registro histórico creado exitosamente.")
        except Exception as e:
            # Manejar cualquier excepción aquí si es necesario
            print(f'Error al crear el registro histórico: {e}')
            
class DesasignarLicEquipoView(generics.RetrieveUpdateAPIView):
    queryset = AsignacionLicenciasEquipo.objects.all()
    serializer_class = DesAsignacionLicEquSerializer
    permission_classes = [AllowAny]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        LicEquipo = instance.id_licencia

        # Guardar valores originales antes de la actualización
        original_values = {
            'id_estado_licencia': LicEquipo.id_estado_licencia,
        }

        # Actualizar el equipo
        LicEquipo.id_estado_licencia = CatEstadoLicencias.objects.get(
            nombre="Sin Asignar")
        LicEquipo.save()

        # Guardar valores actualizados después de la actualización
        updated_values = {
            'id_estado_licencia': LicEquipo.id_estado_licencia,
        }

        # Registrar los cambios en el historial
        for field, original_value in original_values.items():
            current_value = updated_values[field]
            if original_value != current_value:
                verbose_name = LicenciasEquipo._meta.get_field(
                    field).verbose_name
                Historicos.objects.create(
                    usuario=self.request.user if self.request.user.is_authenticated else None,
                    correo_usuario=self.request.user.email if self.request.user.is_authenticated else 'anonimo@example.com',
                    tipo_cambio="Actualización",
                    tipo_activo="Licencia Equipo",
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
            activo_modificado=LicEquipo.nombre_licencia,
            descripcion=f'Se elimino la asignación de la licencia "{LicEquipo.nombre_licencia}" a {
                instance.id_equipo.nombre_equipo}'
        )

        # Eliminar el registro de la tabla AsignacionEquipos después de desasignar el equipo
        instance.delete()

        return Response({"detail": "La licencia ha sido desasignado y el registro ha sido eliminado."}, status=status.HTTP_204_NO_CONTENT)

class LicenciasPersonasSinAsignarViewSet(generics.ListAPIView):
    queryset = LicenciaPersona.objects.filter(
        id_estado_licencia__nombre="Sin Asignar")
    serializer_class = LicenciaPerSinAsignarSerializer
    permission_classes = [AllowAny]


class PersonasSinAsignacionLicenciaViewSet(generics.ListAPIView):
    queryset = Persona.objects.exclude(
        id_trabajador__in=AsignacionLicenciaPersona.objects.values_list('id_trabajador', flat=True))
    serializer_class = PersonaSinAsignacionSerializer  # Usa el nuevo serializer
    permission_classes = [AllowAny]

class LicenciasEquiposSinAsignarViewSet(generics.ListAPIView):
    queryset = LicenciasEquipo.objects.filter(
        id_estado_licencia__nombre="Sin Asignar")
    serializer_class = LicenciaEquSinAsignarSerializer
    permission_classes = [AllowAny]


class EquiposSinAsignacionLicenciaViewSet(generics.ListAPIView):
    queryset = Equipo.objects.exclude(
        id_equipo__in=AsignacionLicenciasEquipo.objects.values_list('id_equipo', flat=True))
    serializer_class = EquipoSinAsignacionSerializer  # Usa el nuevo serializer
    permission_classes = [AllowAny]