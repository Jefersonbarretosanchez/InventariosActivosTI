"""Importaciones"""
from django.contrib.auth.models import User
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import DetailView

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
                        tipo_activo="Equipo",
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

# catalogos
class CatMarcaEquipoViewSet(generics.ListCreateAPIView):
    queryset = CatMarcaequipo.objects.all()
    serializer_class = MarcaEquipoSerializer
    permission_classes = [AllowAny]
    
class CatMarcaequipoUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = MarcaEquipoSerializer
    permission_classes = [AllowAny]
    queryset = CatMarcaequipo.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        
        errors = {}

        if errors:
            return Response({'message': 'Error al actualizar la marca de equipo', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                        tipo_activo="Cat Marca Equipo",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {verbose_name}: de {original_value} a {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error al actualizar la marca de equipo',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar la marca de equipo'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CatSoViewSet(generics.ListCreateAPIView):
    queryset = CatSo.objects.all()
    serializer_class = SoSerializer
    permission_classes = [AllowAny]
    
class CatSoUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = SoSerializer
    permission_classes = [AllowAny]
    queryset = CatSo.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        
        errors = {}

        if errors:
            return Response({'message': 'Error al actualizar el catalogo de sistemas operativos', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                        tipo_activo="Cat Sistema Operativo",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {verbose_name}: de {original_value} a {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error al actualizar el catalogo de sistemas operativos',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar el catalogo de sistemas operativos'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CatMRamViewSet(generics.ListCreateAPIView):
    queryset = CatMemoriaram.objects.all()
    serializer_class = MRamSerializer
    permission_classes = [AllowAny]

class CatMemoriaramUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = MRamSerializer
    permission_classes = [AllowAny]
    queryset = CatMemoriaram.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        
        errors = {}

        if errors:
            return Response({'message': 'Error al actualizar el catalogo de memorias Ram', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                        tipo_activo="Cat Memoria Ram",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {verbose_name}: de {original_value} a {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error al actualizar el catalogo de memorias Ram',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar el catalogo de memorias Ram'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CatDiscoDuroViewSet(generics.ListCreateAPIView):
    queryset = CatDiscoduro.objects.all()
    serializer_class = DiscoDuroSerializer
    permission_classes = [AllowAny]
    
class CatDiscoduroUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = DiscoDuroSerializer
    permission_classes = [AllowAny]
    queryset = CatDiscoduro.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        
        errors = {}

        if errors:
            return Response({'message': 'Error al actualizar el catalogo de discos duros', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                        tipo_activo="Cat Discos Duros",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {verbose_name}: de {original_value} a {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error al actualizar el catalogo de discos duros',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar el catalogo de discos duros'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class CatTipoPropiedadViewSet(generics.ListCreateAPIView):
    queryset = CatTipopropiedad.objects.all()
    serializer_class = TipoPropiedadSerializer
    permission_classes = [AllowAny]
    
class CatTipopropiedadUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = TipoPropiedadSerializer
    permission_classes = [AllowAny]
    queryset = CatTipopropiedad.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        
        errors = {}

        if errors:
            return Response({'message': 'Error al actualizar el catalogo de tipo propiedad', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                        tipo_activo="Cat Tipo Propiedad",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {verbose_name}: de {original_value} a {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error al actualizar el catalogo de tipo propiedad',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar el catalogo de tipo propiedad'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CatTipoEquipoViewSet(generics.ListCreateAPIView):
    queryset = CatTipoequipo.objects.all()
    serializer_class = TipoEquipoSerializer
    permission_classes = [AllowAny]
    
class CatTipoequipoUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = TipoEquipoSerializer
    permission_classes = [AllowAny]
    queryset = CatTipoequipo.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        
        errors = {}

        if errors:
            return Response({'message': 'Error al actualizar el catalogo de tipo equipo', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                        tipo_activo="Cat Tipo Equipo",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {verbose_name}: de {original_value} a {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error al actualizar el catalogo de tipo equipo',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar el catalogo de tipo equipo'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CatEstadoEquipoViewSet(generics.ListCreateAPIView):
    queryset = CatEstadoequipo.objects.all()
    serializer_class = EstadoEquipoSerializer
    permission_classes = [AllowAny]

class CatEstadoequipoUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = EstadoEquipoSerializer
    permission_classes = [AllowAny]
    queryset = CatEstadoequipo.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        
        errors = {}

        if errors:
            return Response({'message': 'Error al actualizar el catalogo de estado equipo', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                        tipo_activo="Cat Estado Equipo",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {verbose_name}: de {original_value} a {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error al actualizar el catalogo de estado equipo',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar el catalogo de estado equipo'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CatCoordinadoresViewSet(generics.ListCreateAPIView):
    queryset = CatCoordinadores.objects.all()
    serializer_class = CoordinadoresSerializer
    permission_classes = [AllowAny]

class CatCoordinadoresUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = CoordinadoresSerializer
    permission_classes = [AllowAny]
    queryset = CatCoordinadores.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        
        errors = {}

        if errors:
            return Response({'message': 'Error al actualizar el catalogo de coordinadores', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                        tipo_activo="Cat Coordinadores",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {verbose_name}: de {original_value} a {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error al actualizar el catalogo de coordinadores',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar el catalogo de coordinadores'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CatUbicacionViewSet(generics.ListCreateAPIView):
    queryset = CatUbicacion.objects.all()
    serializer_class = UbicacionSerializer
    permission_classes = [AllowAny]
    
class CatUbicacionUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = UbicacionSerializer
    permission_classes = [AllowAny]
    queryset = CatUbicacion.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        
        errors = {}

        if errors:
            return Response({'message': 'Error al actualizar el catalogo de ubicaciones de bodega', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                        tipo_activo="Cat Ubicaciones",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {verbose_name}: de {original_value} a {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error al actualizar el catalogo de ubicaciones de bodega',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar el catalogo de ubicaciones de bodega'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Vistas Modulo Asignaciones


class PersonasAsigEquiposView(generics.ListAPIView):
    queryset = Persona.objects.all()
    serializer_class = PersonasAsigEquiposSerializer
    permission_classes = [AllowAny]


class EquiposAsignacionViewSet(generics.ListAPIView):
    queryset = Equipo.objects.all()
    serializer_class = EquiposAsignacionSerializer
    permission_classes = [AllowAny]


class AsignarEquipoView(generics.ListCreateAPIView):
    queryset = AsignacionEquipos.objects.all()
    serializer_class = AsignacionEquiposSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        # Guardar la nueva asignación
        AsignacionEquipos = serializer.save()
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
                tipo_activo="Equipo",
                activo_modificado=AsignacionEquipos.id_equipo.nombre_equipo,
                descripcion=f'Se asigno el equipo "{AsignacionEquipos.id_equipo.nombre_equipo} a {
                    AsignacionEquipos.id_trabajador.nombres}"'
            )
            print("Registro histórico creado exitosamente.")
        except Exception as e:
            # Manejar cualquier excepción aquí si es necesario
            print(f'Error al crear el registro histórico: {e}')


class ActualizarAsignacionView(generics.RetrieveUpdateAPIView):
    serializer_class = AsignacionEquiposSerializer
    permission_classes = [AllowAny]
    queryset = AsignacionEquipos.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)

        if serializer.is_valid():

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
                        tipo_activo="Asignación Equipos",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {verbose_name}: de {
                            original_value} a {current_value}'
                    )

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DesasignarEquipoView(generics.RetrieveUpdateAPIView):
    queryset = AsignacionEquipos.objects.all()
    serializer_class = DesAsignacionEquiposSerializer
    permission_classes = [AllowAny]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        data = request.data
        id_coordinadores = data.get('id_coordinadores')
        id_ubicacion = data.get('id_ubicacion')

        if not id_coordinadores or not id_ubicacion:
            return Response({"detail": "Debe proporcionar el coordinador y la ubicación de la bodega."}, status=status.HTTP_400_BAD_REQUEST)

        equipo = instance.id_equipo

        # Guardar valores originales antes de la actualización
        original_values = {
            'id_coordinadores': equipo.id_coordinadores,
            'id_ubicacion': equipo.id_ubicacion,
            'id_estadoequipo': equipo.id_estadoequipo,
        }

        # Actualizar el equipo
        equipo.id_estadoequipo = CatEstadoequipo.objects.get(
            nombre="En Bodega")
        equipo.id_coordinadores_id = id_coordinadores
        equipo.id_ubicacion_id = id_ubicacion
        equipo.save()

        # Guardar valores actualizados después de la actualización
        updated_values = {
            'id_coordinadores': equipo.id_coordinadores,
            'id_ubicacion': equipo.id_ubicacion,
            'id_estadoequipo': equipo.id_estadoequipo,
        }

        # Registrar los cambios en el historial
        for field, original_value in original_values.items():
            current_value = updated_values[field]
            if original_value != current_value:
                verbose_name = equipo._meta.get_field(field).verbose_name
                Historicos.objects.create(
                    usuario=self.request.user if self.request.user.is_authenticated else None,
                    correo_usuario=self.request.user.email if self.request.user.is_authenticated else 'anonimo@example.com',
                    tipo_cambio="Actualización",
                    tipo_activo="Equipo",
                    activo_modificado=verbose_name,
                    descripcion=f'Cambio en {verbose_name}: de {original_value} a {
                        current_value} (Por Desasignacion Equipos)'
                )

        # Guardar el histórico de la desasignación
        Historicos.objects.create(
            usuario=self.request.user if self.request.user.is_authenticated else None,
            correo_usuario=self.request.user.email if self.request.user.is_authenticated else 'anonimo@example.com',
            tipo_cambio="Desasignación",
            tipo_activo="Equipo",
            activo_modificado=equipo.nombre_equipo,
            descripcion=f'Se elimino la asignación del equipo "{equipo.nombre_equipo}" a {
                instance.id_trabajador.nombres} {instance.id_trabajador.apellidos}'
        )

        # Eliminar el registro de la tabla AsignacionEquipos después de desasignar el equipo
        instance.delete()

        return Response({"detail": "El equipo ha sido desasignado y el registro ha sido eliminado."}, status=status.HTTP_204_NO_CONTENT)

# Vistas Perifericos


class EstadoPerifericosView(generics.ListCreateAPIView):
    queryset = CatEstadoPeriferico.objects.all()
    serializer_class = EstadoPerifericosSerializer
    permission_classes = [AllowAny]


class PerifericosListCreate(generics.ListCreateAPIView):
    queryset = Perifericos.objects.all()
    serializer_class = PerifericosSerializer
    permission_classes = [AllowAny]


class PerifericosUpdate(generics.RetrieveUpdateAPIView):
    queryset = Perifericos.objects.all()
    serializer_class = PerifericosSerializer
    permission_classes = [AllowAny]


class KitPerifericosListCreateView(generics.ListCreateAPIView):
    queryset = KitPerifericos.objects.all()
    serializer_class = KitPerifericosSerializer
    permission_classes = [AllowAny]


class KitPerifericosUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = KitPerifericos.objects.all()
    serializer_class = KitPerifericosUpdateSerializer
    permission_classes = [AllowAny]


class PerifericosUpdate(generics.RetrieveUpdateAPIView):
    queryset = Perifericos.objects.all()
    serializer_class = PerifericosSerializer
    permission_classes = [AllowAny]


class EquiposEnBodegaViewSet(generics.ListAPIView):
    queryset = Equipo.objects.filter(id_estadoequipo__nombre="En Bodega")
    serializer_class = EquipoSerializer
    permission_classes = [AllowAny]


class PersonasSinAsignacionViewSet(generics.ListAPIView):
    queryset = Persona.objects.exclude(
        id_trabajador__in=AsignacionEquipos.objects.values_list('id_trabajador', flat=True))
    serializer_class = PersonasAsigEquiposSerializer
    permission_classes = [AllowAny]
