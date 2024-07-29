"""Importaciones"""
import logging
import pandas as pd
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages
from django.db import connection
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView

from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .forms import PersonaCreacion, PersonaActualizar, UploadExcelForm
from .models import Historicos, Persona, CatCentroCosto, CatArea, CatRegion, CatCargo, CatEstadoPersona
from .serializers import UserSerializer, PersonaSerializer, CentroCostoSerializer, AreaSerializer, RegionSerializer, CargoSerializer, EstadoPersonaSerializer, historicoSerializer, ActivosSerializer, CustomTokenObtainPairSerializer
# Create your views here.

# Configuración del logger
logger = logging.getLogger(__name__)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'detail': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = authenticate(username=username, password=password)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)

                # Registro para depuración
                logger.info(f"Generated Access Token: {access_token}")
                logger.info(f"Generated Refresh Token: {str(refresh)}")

                user_info = {
                    'userId': user.id,
                    'username': user.username,
                    'email': user.email,
                    'nombre': user.first_name,
                    'apellidos': user.last_name,
                }

                return Response({
                    'access': access_token,
                    'refresh': str(refresh),
                    'user': user_info
                }, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            logger.error(f"Error during authentication: {str(e)}")
            return Response({'detail': 'An error occurred during authentication'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


CATALOGOS = {
    'area': {
        'model': CatArea,
        'sequence': 'cat_area_id_area_seq',
        'id_field': 'id_area'
    },
    'region': {
        'model': CatRegion,
        'sequence': 'cat_region_id_region_seq',
        'id_field': 'id_region'
    },
    # Añadir más catálogos según sea necesario...
}


@login_required
def catalogos(request):
    catalogs = [
        {'name': 'Cargue Masivo Areas', 'slug': 'area'},
        {'name': 'Cargue Masivo Regiones', 'slug': 'region'},
        # Agrega más catálogos según sea necesario
    ]
    return render(request, 'carga_masiva.html', {'catalogs': catalogs})


def update_sequence(table_name, sequence_name, id_field):
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT setval(pg_get_serial_sequence('{table_name}', '{
                       id_field}'), (SELECT MAX({id_field}) FROM {table_name}))")


def upload_excel_view(request, catalogo):
    if catalogo not in CATALOGOS:
        messages.error(request, "Catálogo no válido.")
        return redirect("admin:index")

    model_info = CATALOGOS[catalogo]
    model = model_info['model']
    sequence = model_info['sequence']
    id_field = model_info['id_field']

    if request.method == "POST":
        form = UploadExcelForm(request.POST, request.FILES)
        if form.is_valid():
            archivo_excel = request.FILES["archivo_excel"]
            try:
                df = pd.read_excel(archivo_excel, engine='openpyxl')
                # Eliminar filas que tengan NaN en la columna del id
                df = df.dropna(subset=[id_field])
            except Exception as e:
                messages.error(request, f"Error al leer el archivo: {str(e)}")
                return redirect("admin:carga_masiva", catalogo=catalogo)

            for index, row in df.iterrows():
                try:
                    id_value = row[id_field]
                    nombre = row["nombre"]

                    if pd.isna(id_value):
                        raise ValueError(f"Field '{id_field}' cannot be NaN")

                    id_value = int(id_value)  # Convertir a entero

                    model.objects.update_or_create(
                        **{id_field: id_value},
                        defaults={"nombre": nombre}
                    )
                except Exception as e:
                    messages.error(request, f"Error en la fila {
                                   index + 1}: {str(e)}")
                    continue

            # Actualizar la secuencia después de la carga
            update_sequence(model._meta.db_table, sequence, id_field)

            messages.success(request, "Datos cargados exitosamente.")
            return redirect("admin:index")
    else:
        form = UploadExcelForm()

    return render(request, "admin/upload_excel.html", {"form": form})


class PersonaCreate(LoginRequiredMixin, CreateView):
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


class PersonaLista(LoginRequiredMixin, ListView):
    """Lista personas"""
    model = Historicos
    template_name = 'persona.html'
    context_object_name = 'personas'
    queryset = Historicos.objects.all().order_by('-fecha_registro')


class PersonaUpdate(LoginRequiredMixin, UpdateView):
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


class PersonaDelete(LoginRequiredMixin, DeleteView):
    """"Vista para eliminar Personas"""
    model = Persona
    template_name = 'persona_confirm_delete.html'
    success_url = reverse_lazy('list')


class PersonaListCreate(generics.ListCreateAPIView):
    serializer_class = PersonaSerializer
    # permission_classes = [AllowAny]

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
    queryset = Persona.objects.all()

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
        if Persona.objects.filter(correo_personal=correo_personal).exclude(id_trabajador=instance.id_trabajador).exists():
            errors["Correo Personal"] = correo_personal
        if Persona.objects.filter(correo_institucional=correo_institucional).exclude(id_trabajador=instance.id_trabajador).exists():
            errors["Correo Institucional"] = correo_institucional

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
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Persona.objects.filter(nombres=user)


class CreateUserView(generics.ListCreateAPIView):
    """CU"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class CatCentroCostoViewSet(generics.ListCreateAPIView):
    queryset = CatCentroCosto.objects.all()
    serializer_class = CentroCostoSerializer
    permission_classes = [AllowAny]


class CatCentroCostoUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = CentroCostoSerializer
    permission_classes = [AllowAny]
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
    permission_classes = [AllowAny]


class CatAreaUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = AreaSerializer
    permission_classes = [AllowAny]
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
    permission_classes = [AllowAny]


class CatRegionUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = RegionSerializer
    permission_classes = [AllowAny]
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
    permission_classes = [AllowAny]


class CatCargoUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = CargoSerializer
    permission_classes = [AllowAny]
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
    permission_classes = [AllowAny]


class CatEstadoPersonaUpdate(generics.RetrieveUpdateAPIView):
    """Actualización Centros de costo"""
    serializer_class = EstadoPersonaSerializer
    permission_classes = [AllowAny]
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
    queryset = Historicos.objects.all()
    serializer_class = historicoSerializer
    permission_classes = [AllowAny]


# activos general
class ActivosViewSet(generics.ListAPIView):
    queryset = Persona.objects.all()
    serializer_class = ActivosSerializer
    permission_classes = [AllowAny]
