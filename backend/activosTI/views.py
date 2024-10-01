"""Importaciones"""
import logging
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Prefetch
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView

from rest_framework import generics, status, permissions, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .forms import PersonaCreacion, PersonaActualizar
from Equipos.models import AsignacionEquipos
from Licencias.models import AsignacionLicenciaPersona
from ComplementosActivos.models import AsignacionAplicaciones
from .models import Historicos, Persona, CatCentroCosto, CatArea, CatRegion, CatCargo, CatEstadoPersona
from .serializers import UserSerializer, CambioContraseñaUsuarioSerializer, CambioContraseñaAdminSerializer, PersonaSerializer, CentroCostoSerializer, AreaSerializer, RegionSerializer, CargoSerializer, EstadoPersonaSerializer, historicoSerializer, ActivosSerializer, CustomTokenObtainPairSerializer
from rest_framework.decorators import api_view

# Create your views here.

# Configuración del logger
logger = logging.getLogger(__name__)

# Definir un permiso personalizado para verificar los permisos del rol

# Api Control Permisos Usuarios


class PermisosApis(BasePermission):
    def has_permission(self, request, view):
        # Obtener el rol del usuario desde el grupo al que pertenece
        user = request.user
        grupo = user.groups.first()  # Suponemos que el usuario tiene un solo grupo

        if not grupo:
            return False  # Si el usuario no pertenece a un grupo, denegar acceso

        # Obtener el nombre del rol del usuario
        rol = grupo.name
        permisos_usuario = PERMISOS_ROLES.get(rol, {})

        # Obtener la URL solicitada para saber qué API está tratando de acceder
        path = request.path

        # Definir aquí la lógica de validación de permisos basada en la URL
        permiso = None
        if 'activos' in path:
            permiso = permisos_usuario.get('activos', 'n/a')

        elif any(keyword in path for keyword in ['asig_equipo', 'asignar_equipo', 'actualizar_asignacion_equipo', 'desasignar_equipo', 'equipos_asignacion', 'perifericos', 'kit_perifericos', 'equipos_en_bodega', 'personas_sin_asignacion', 'perifericos_sin_asignar']):
            permiso = permisos_usuario.get('asignacion_equipos', 'n/a')

        elif 'personas' in path:
            permiso = permisos_usuario.get('personas', 'n/a')

        elif 'centro_costos' in path:
            permiso_personas = permisos_usuario.get('personas', 'n/a')
            permiso_licencias = permisos_usuario.get('licencias', 'n/a')
            permiso_administracion = permisos_usuario.get(
                'administracion', 'n/a')

            # Si el rol tiene acceso de administración, puede leer y escribir
            if request.method == 'GET':
                if permiso_personas in ['r', 'rw'] or permiso_licencias in ['r', 'rw'] or permiso_administracion in ['r', 'rw']:
                    return True
            elif request.method in ['POST', 'PUT', 'DELETE']:
                if permiso_administracion == 'rw':  # Solo administración puede escribir
                    return True
            return False  # Si no tiene permisos adecuados, denegar acceso

        elif any(keyword in path for keyword in ['area', 'region', 'cargo', 'estado_persona']):
            # Aquí controlamos los permisos de lectura y escritura para 'area'
            permiso_personas = permisos_usuario.get('personas', 'n/a')
            permiso_administracion = permisos_usuario.get(
                'administracion', 'n/a')

            # Si el rol tiene acceso de administración, puede leer y escribir
            if request.method == 'GET':
                if permiso_personas in ['r', 'rw'] or permiso_administracion in ['r', 'rw']:
                    return True
            elif request.method in ['POST', 'PUT', 'DELETE']:
                if permiso_administracion == 'rw':  # Solo administración puede escribir
                    return True
            return False  # Si no tiene permisos adecuados, denegar acceso

        elif 'equipos' in path:
            permiso = permisos_usuario.get('equipos', 'n/a')

        elif any(keyword in path for keyword in ['marca_equipo', 'so', 'memoria_ram', 'disco_duro', 'tipo_propiedad', 'tipo_equipo', 'estado_equipo', 'coordinadores', 'ubicaciones', 'estado_perifericos']):
            permiso_equipos = permisos_usuario.get('equipos', 'n/a')
            # permiso_administracion = permisos_usuario.get('administracion', 'n/a')

            if request.method == 'GET':
                if permiso_equipos in ['r', 'rw'] or permiso_administracion in ['r', 'rw']:
                    return True
                elif request.method in ['POST', 'PUT', 'DELETE']:
                    if permiso_administracion == 'rw':
                        return True
                return False

        elif any(keyword in path for keyword in ['asignar_licencia_persona', 'desasignar_licencia_persona', 'asignar_licencia_equipo', 'desasignar_licencia_equipo', 'licencias_sin_asignar', 'personas_sin_asignacion_licencia', 'licencias_sin_asignar_equipos', 'equipos_sin_asignacion_licencia']):
            permiso = permisos_usuario.get('asignacion_licencias', 'n/a')

        elif 'contratos' in path:
            permiso_licencias = permisos_usuario.get('licencias', 'n/a')
            permiso_contratos = permisos_usuario.get('contratos', 'n/a')

            if request.method == 'GET':
                if permiso_licencias in ['r', 'rw'] or permiso_contratos in ['r', 'rw']:
                    return True
            elif request.method in ['POST', 'PUT', 'DELETE']:
                if permiso_contratos == 'rw':
                    return True
            return False  # Si no tiene permisos adecuados, denegar acceso

        elif 'licencias' in path:
            permiso = permisos_usuario.get('licencias', 'n/a')

        elif 'aplicaciones' in path:
            permiso = permisos_usuario.get('aplicaciones', 'n/a')

        elif 'log' in path:
            permiso = permisos_usuario.get('logs', 'n/a')

        elif 'usuarios' in path:
            permiso = permisos_usuario.get('administracion', 'n/a')

        else:
            return False  # Ruta no reconocida, denegar acceso

        # Si el permiso es 'n/a', denegar acceso
        if permiso == 'n/a':
            return False

        # Controlar los métodos de lectura (GET) y escritura (POST, PUT, DELETE)
        if request.method == 'GET' and permiso in ['r', 'rw']:
            return True
        elif request.method in ['POST', 'PUT', 'DELETE'] and permiso == 'rw':
            return True

        # Si no se cumple ninguna condición, denegar acceso
        return False

# Fin Api Permisos Usuarios

# APIs gestión Usuarios


class CreacionUsuariosView(generics.ListCreateAPIView):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Usuario creado con éxito.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                "message": "Hubo un error al crear el usuario.",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)


class ListaRolesView(APIView):
    def get(self, request):
        grupos = Group.objects.all()
        roles = [{"value": grupo.name, "label": grupo.name}
                 for grupo in grupos]
        return Response(roles, status=200)


class ActualizacionUsuariosView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)

        if serializer.is_valid():
            # Realiza la actualización del usuario
            instance = serializer.save()
            group_name = serializer.validated_data.get('group')

            # Actualiza el grupo
            if group_name:
                group, created = Group.objects.get_or_create(name=group_name)
                instance.groups.clear()  # Limpiar los grupos actuales
                instance.groups.add(group)

            return Response({
                "message": "Usuario actualizado con éxito."
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "message": "Error al actualizar el usuario.",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)


class CambioContraseñaUsuarioView(generics.UpdateAPIView):
    """API para el cambio de contraseña directamente del usuario"""
    serializer_class = CambioContraseñaUsuarioSerializer
    model = User
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, queryset=None):
        return self.request.user  # Retorna el usuario autenticado

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(
            data=request.data, context={'request': request})

        if serializer.is_valid():
            # Cambiar la contraseña
            serializer.update(user, serializer.validated_data)
            return Response({"detail": "Contraseña actualizada correctamente."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CambioContraseñaAdminView(generics.UpdateAPIView):
    """
    API para que un administrador cambie la contraseña de un usuario.
    """
    serializer_class = CambioContraseñaAdminSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated, PermisosApis]

    def get_object(self):
        # Obtener el usuario cuyo ID fue pasado en la URL
        user_id = self.kwargs.get('pk')
        return User.objects.get(pk=user_id)

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Cambiar la contraseña
            serializer.update(user, serializer.validated_data)
            return Response({"detail": f"La contraseña del usuario {user.username} ha sido actualizada correctamente."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# Fin APIs Gestión Usuarios
# --------------------------------------

# Inicio APIs Tokenización Personalizada


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        refresh = response.data.get('refresh')
        access = response.data.get('access')

        if refresh and access:
            response.set_cookie(
                'sigs_cookies',
                refresh,
                httponly=True,
                secure=True,
                samesite='None'
            )
            response.set_cookie(
                'sigs_cookie',
                access,
                httponly=True,
                secure=True,
                samesite='None'
            )
            del response.data['refresh']
            del response.data['access']

        return response


class MyTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # Obtén el refresh token desde las cookies
        sigs_cookies = request.COOKIES.get('sigs_cookies')

        if not sigs_cookies:
            return Response({'detail': 'Refresh token not found.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Usa el refresh token para obtener un nuevo access token
        try:
            refresh = RefreshToken(sigs_cookies)
            access = str(refresh.access_token)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_401_UNAUTHORIZED)

        # Configura la cookie para el nuevo access token
        response = Response({'SIGS': access})
        response.set_cookie('sigs_cookie', access,
                            httponly=True, secure=True, samesite='None')

        return response

# Fin APIs Tokenización Personalizada
# --------------------------------------

# Inicio APIs Personas


class PersonaListCreate(generics.ListCreateAPIView):
    serializer_class = PersonaSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]

    def get_queryset(self):
        return Persona.objects.select_related(
            'id_centro_costo',
            'id_area',
            'id_region',
            'id_cargo',
            'id_estado_persona'
        ).all()

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

        # Validaciones personalizadas
        identificacion = request.data.get('identificacion')
        correo_personal = request.data.get('correo_personal')
        correo_institucional = request.data.get('correo_institucional')

        errors = {}

        if Persona.objects.filter(identificacion=identificacion).exists():
            errors["Numero Identificación"] = identificacion
        if Persona.objects.filter(correo_personal=correo_personal).exists():
            errors["Correo Personal"] = correo_personal
        if Persona.objects.filter(correo_institucional=correo_institucional).exists():
            errors["Correo Institucional"] = correo_institucional

        if errors:
            return Response({'message': 'Error al crear la persona',  'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                'message': 'Error al crear la persona',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al crear la persona'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PersonasUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Personas"""
    serializer_class = PersonaSerializer
    permission_classes = [AllowAny]
    permission_classes = [permissions.IsAuthenticated, PermisosApis]
    queryset = Persona.objects.select_related(
        'id_centro_costo',
        'id_area',
        'id_region',
        'id_cargo',
        'id_estado_persona'
    ).all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Validaciones personalizadas
        identificacion = request.data.get(
            'identificacion', instance.identificacion)
        correo_personal = request.data.get(
            'correo_personal', instance.correo_personal)
        correo_institucional = request.data.get(
            'correo_institucional', instance.correo_institucional)

        errors = {}

        if Persona.objects.filter(identificacion=identificacion).exclude(id_trabajador=instance.id_trabajador).exists():
            errors["Numero Identificación"] = identificacion
        if correo_personal:  # Verifica si correo_personal no está vacío
            if Persona.objects.filter(correo_personal=correo_personal).exclude(id_trabajador=instance.id_trabajador).exists():
                errors["Correo Personal"] = correo_personal
        if Persona.objects.filter(correo_institucional=correo_institucional).exclude(id_trabajador=instance.id_trabajador).exists():
            errors["Correo Institucional"] = correo_institucional

        # Validación para inactivar la persona
        nuevo_estado_id = request.data.get(
            'id_estado_persona', instance.id_estado_persona.id_estado_persona)
        if int(nuevo_estado_id) == CatEstadoPersona.objects.get(nombre="Inactivo").id_estado_persona:
            if AsignacionEquipos.objects.filter(id_trabajador=instance).exists() or \
               AsignacionLicenciaPersona.objects.filter(id_trabajador=instance).exists() or \
               AsignacionAplicaciones.objects.filter(id_trabajador=instance).exists():
                errors["Estado Persona"] = [
                    "No se puede inactivar a esta persona porque tiene asignaciones activas de equipos, licencias y/o aplicaciones."]

        if errors:
            return Response({'message': 'Error Al Actualizar El Registro', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                        tipo_activo="Persona",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {verbose_name}: de {
                            original_value} a {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error Al Actualizar El Registro',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar la persona'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PersonasDelete(generics.DestroyAPIView):
    """ND"""
    serializer_class = PersonaSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]

    def get_queryset(self):
        user = self.request.user
        return Persona.objects.filter(nombres=user)

# -----------------------------------------------------

# Inicio APIs Catalogos


class CatCentroCostoViewSet(generics.ListCreateAPIView):
    queryset = CatCentroCosto.objects.all()
    serializer_class = CentroCostoSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]


class CatCentroCostoUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = CentroCostoSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]
    queryset = CatCentroCosto.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        errors = {}

        if errors:
            return Response({'message': 'Error Al Actualizar El Cntro De Costo', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                        tipo_activo="Centro Costo",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {verbose_name}: de {
                            original_value} a {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error Al Actualizar El Centro De Costo',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar el centro de costo'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CatAreaViewSet(generics.ListCreateAPIView):
    queryset = CatArea.objects.all()
    serializer_class = AreaSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]


class CatAreaUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = AreaSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]
    queryset = CatArea.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        errors = {}

        if errors:
            return Response({'message': 'Error Al Actualizar El Area', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                        tipo_activo="Area",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {verbose_name}: de {
                            original_value} a {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error Al Actualizar El Area',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar el area'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CatRegionViewSet(generics.ListCreateAPIView):
    queryset = CatRegion.objects.all()
    serializer_class = RegionSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]


class CatRegionUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = RegionSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]
    queryset = CatRegion.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        errors = {}

        if errors:
            return Response({'message': 'Error Al Actualizar La Region', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                        tipo_activo="Region",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {verbose_name}: de {
                            original_value} a {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error Al Actualizar La Region',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar la region'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CatCargoViewSet(generics.ListCreateAPIView):
    queryset = CatCargo.objects.all()
    serializer_class = CargoSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]


class CatCargoUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = CargoSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]
    queryset = CatCargo.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        errors = {}

        if errors:
            return Response({'message': 'Error Al Actualizar El Cargo', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                        tipo_activo="Cargo",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {verbose_name}: de {
                            original_value} a {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error Al Actualizar El Cargo',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar el cargo'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CatEstadoPersonaViewSet(generics.ListCreateAPIView):
    queryset = CatEstadoPersona.objects.all()
    serializer_class = EstadoPersonaSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]


class CatEstadoPersonaUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = EstadoPersonaSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]
    queryset = CatEstadoPersona.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        errors = {}

        if errors:
            return Response({'message': 'Error Al Actualizar El Estado', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

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
                        tipo_activo="Estado",
                        activo_modificado=verbose_name,
                        descripcion=f'Cambio en {verbose_name}: de {
                            original_value} a {current_value}'
                    )

            return Response(serializer.data)
        except ValidationError as e:
            # Captura otros errores de validación
            errors = {field: [str(error) for error in messages]
                      for field, messages in e.detail.items()}
            customized_response = {
                'message': 'Error Al Actualizar El Estado',
                'errors': errors
            }
            return Response(customized_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Manejar cualquier otra excepción aquí si es necesario
            print(f'Error inesperado: {e}')
            return Response({'message': 'Error inesperado al actualizar el estado'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# modulo historicos
class HistoricosList(generics.ListAPIView):
    queryset = Historicos.objects.select_related(
        'usuario').order_by('-fecha_registro')
    serializer_class = historicoSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]


# activos general
class ActivosViewSet(generics.ListAPIView):
    queryset = Persona.objects.all().prefetch_related(
        Prefetch('asignacionequipos_set',
                 queryset=AsignacionEquipos.objects.select_related('id_equipo')),
        Prefetch('asignacionlicenciapersona_set',
                 queryset=AsignacionLicenciaPersona.objects.select_related('id_licencia')),
        Prefetch('asignacionaplicaciones_set',
                 queryset=AsignacionAplicaciones.objects.select_related('id_aplicacion')),
    ).select_related('id_centro_costo', 'id_area', 'id_region', 'id_cargo', 'id_estado_persona')
    serializer_class = ActivosSerializer
    permission_classes = [permissions.IsAuthenticated, PermisosApis]


# Definimos los permisos de los roles directamente en el código
PERMISOS_ROLES = {
    'Administrador': {
        'activos': 'rw',
        'personas': 'rw',
        'equipos': 'rw',
        'asignacion_equipos': 'rw',
        'licencias': 'rw',
        'asignacion_licencias': 'rw',
        'aplicaciones': 'rw',
        'contratos': 'rw',
        'logs': 'rw',
        'administracion': 'rw',
        'config_usuarios': 'rw',
    },
    'Agente Mesa de Servicios': {
        'activos': 'rw',
        'personas': 'rw',
        'equipos': 'rw',
        'asignacion_equipos': 'rw',
        'licencias': 'rw',
        'asignacion_licencias': 'rw',
        'aplicaciones': 'rw',
        'contratos': 'rw',
        'logs': 'n/a',
        'administracion': 'n/a',
        'config_usuarios': 'n/a',
    },
    'Agente RRHH': {
        'activos': 'n/a',
        'personas': 'rw',
        'equipos': 'n/a',
        'asignacion_equipos': 'n/a',
        'licencias': 'n/a',
        'asignacion_licencias': 'n/a',
        'aplicaciones': 'n/a',
        'contratos': 'n/a',
        'logs': 'n/a',
        'administracion': 'n/a',
        'config_usuarios': 'n/a',
    },
    'Agente Compras': {
        'activos': 'r',
        'personas': 'r',
        'equipos': 'rw',
        'asignacion_equipos': 'r',
        'licencias': 'rw',
        'asignacion_licencias': 'r',
        'aplicaciones': 'r',
        'contratos': 'r',
        'logs': 'n/a',
        'administracion': 'n/a',
        'config_usuarios': 'n/a',
    },
    'Visitante': {
        'activos': 'r',
        'personas': 'r',
        'equipos': 'r',
        'asignacion_equipos': 'r',
        'licencias': 'r',
        'asignacion_licencias': 'r',
        'aplicaciones': 'r',
        'contratos': 'r',
        'logs': 'n/a',
        'administracion': 'n/a',
        'config_usuarios': 'n/a',
    }
}


@api_view(['GET'])
def obtener_permisos_usuario(request):
    user = request.user
    permisos = {}
    rol = None  # Variable para almacenar el rol del usuario

    # Verificamos a qué grupo (rol) pertenece el usuario
    grupo = user.groups.first()  # el usuario solo debe tener un grupo
    if grupo:
        permisos = PERMISOS_ROLES.get(grupo.name, {})
        rol = grupo.name  # Guardamos el nombre del grupo como el rol

    # Retornamos permisos y el rol del usuario
    return Response({
        'permisos': permisos,
        'rol': rol  # Aquí añadimos el nombre del rol
    })
