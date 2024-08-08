import pandas as pd
from django.shortcuts import render,redirect
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages
from django.db import connection
from django.views import View
from django.contrib.auth.decorators import login_required
from .forms import UploadExcelForm
from activosTI.models import Historicos, Persona, CatCentroCosto, CatArea, CatRegion, CatCargo, CatEstadoPersona
from Equipos.models import *
from Licencias.models import *
from django.contrib.auth.models import User

# Create your views here.
# Carga masiva Catalogos
# Diccionario de catalogos
CATALOGOS = {
    'area': {
        'model': CatArea,
        'sequence': 'cat_area_id_area_seq',
        'id_field': 'id_area'
    },
    'cargo': {
        'model': CatCargo,
        'sequence': 'cat_cargo_id_cargo_seq',
        'id_field': 'id_cargo'
    },
    'centro_costo':{
        'model': CatCentroCosto,
        'sequence': 'cat_alianza_id_alianza_seq',
        'id_field': 'id_centro_costo'
    },
    'estado_persona':{
        'model': CatEstadoPersona,
        'sequence': 'cat_region_id_centro_costo_seq',
        'id_field': 'id_estado_persona'
    },
    'region': {
        'model': CatRegion,
        'sequence': 'cat_region_id_region_seq',
        'id_field': 'id_region'
    },
    'personas': {
        'model': Persona,
        'sequence': 'persona_id_trabajador_seq',
        'id_field': 'id_trabajador'
    },
    'marca_equipo':{
        'model': CatMarcaequipo,
        'sequence':'cat_marcaequipo_id_marcaequipo_seq',
        'id_field':'id_marcaequipo'
    },
    'sistema_operativo':{
        'model':CatSo,
        'sequence':'cat_so_id_so_seq',
        'id_field':'id_so'
    },
    'memoria_ram':{
        'model':CatMemoriaram,
        'sequence':'cat_memoriaram_id_ram_seq',
        'id_field':'id_ram'
    },
    'disco_duro':{
        'model':CatDiscoduro,
        'sequence':'cat_discoduro_id_discoduro_seq',
        'id_field':'id_discoduro'
    },
    'tipo_propiedad':{
        'model':CatTipopropiedad,
        'sequence':'cat_tipopropiedad_id_tipopropiedad_seq',
        'id_field':'id_tipopropiedad'
    },
    'tipo_equipo':{
        'model':CatTipoequipo,
        'sequence':'cat_tipoequipo_id_tipoequipo_seq',
        'id_field':'id_tipoequipo'
    },
    'estado_equipo':{
        'model':CatEstadoequipo,
        'sequence':'cat_estadoequipo_id_estadoequipo_seq',
        'id_field':'id_estadoequipo'
    },
    'coordinador':{
        'model':CatCoordinadores,
        'sequence':'cat_coordinadores_id_coordinadores_seq',
        'id_field':'id_coordinadores'
    },
    'ubicacion':{
        'model':CatUbicacion,
        'sequence':'cat_ubicacion_id_ubicacion_seq',
        'id_field':'id_ubicacion'
    },
    'equipos':{
        'model':Equipo,
        'sequence':'equipo_id_equipo_seq',
        'id_field':'id_equipo'
    },
    'estado_perifericos':{
        'model':CatEstadoPeriferico,
        'sequence':'cat_estado_periferico_id_estado_periferico_seq',
        'id_field':'id_estado_periferico'
    },
    'perifericos':{
        'model':Perifericos,
        'sequence':'perifericos_id_perifericos_seq',
        'id_field':'id_perifericos'
    },
    'asignacion_equipos':{
        'model':AsignacionEquipos,
        'sequence':'18.885',
        'id_field':'id_asignacion'
    },
    'estado_licencias':{
        'model':CatEstadoLicencias,
        'sequence':'cat_estado_licencia_id_estado_licencia_seq',
        'id_field':'id_estado_licencia'
    },
    'contratos':{
        'model':Contratos,
        'sequence':'contratos_id_contrato_seq',
        'id_field':'id_contrato'
    },
    # '':{
    #     'model':,
    #     'sequence':'',
    #     'id_field':''
    # },
}


@login_required
def catalogos(request):
    catalogs = [
        {'name': 'Cargue Masivo Areas', 'slug': 'area'},
        {'name': 'Cargue Masivo Cargos', 'slug': 'cargo'},
        {'name': 'Cargue Masivo Centros De Costos', 'slug': 'centro_costo'},
        {'name': 'Cargue Masivo Estados Personas', 'slug': 'estado_persona'},
        {'name': 'Cargue Masivo Regiones', 'slug': 'region'},
        {'name': 'Cargue Masivo Personas', 'slug': 'personas'},
        {'name': 'Cargue Masivo Marcas Equipos', 'slug': 'marca_equipo'},
        {'name': 'Cargue Masivo Sistemas Operativos', 'slug': 'sistema_operativo'},
        {'name': 'Cargue Masivo Memoria Ram', 'slug': 'memoria_ram'},
        {'name': 'Cargue Masivo Disco Duro', 'slug': 'disco_duro'},
        {'name': 'Cargue Masivo Tipo Propiedad', 'slug': 'tipo_propiedad'},
        {'name': 'Cargue Masivo Estado Equipo', 'slug': 'estado_equipo'},
        {'name': 'Cargue Masivo Coordinadores', 'slug': 'coordinador'},
        {'name': 'Cargue Masivo Ubicaciones Bodegas', 'slug': 'ubicacion'},
        {'name': 'Cargue Masivo Equipos', 'slug': 'equipos'},
        {'name': 'Cargue Masivo Estado Perifericos', 'slug': 'estado_perifericos'},
        {'name': 'Cargue Masivo Perifericos', 'slug': 'perifericos'},
        {'name': 'Cargue Masivo Asignación Equipos', 'slug': 'asignacion_equipos'},
        {'name': 'Cargue Masivo Estado Licencias', 'slug': 'estado_licencias'},
        {'name': 'Cargue Masivo Contratos', 'slug': 'contratos'},
    ]
    return render(request, 'carga_masiva.html', {'catalogs': catalogs})


def update_sequence(table_name, sequence_name, id_field):
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT setval(pg_get_serial_sequence('{table_name}', '{id_field}'), (SELECT MAX({id_field}) FROM {table_name}))")

class CargaMasivaView(LoginRequiredMixin, View):
    def get(self, request, catalogo):
        if catalogo not in CATALOGOS:
            messages.error(request, "Catálogo no válido.")
            return redirect("admin:index")

        form = UploadExcelForm()
        return render(request, "admin/upload_excel.html", {"form": form, "catalogo": catalogo})

    def post(self, request, catalogo):
        if catalogo not in CATALOGOS:
            messages.error(request, "Catálogo no válido.")
            return redirect("admin:index")

        model_info = CATALOGOS[catalogo]
        model = model_info['model']
        sequence = model_info['sequence']
        id_field = model_info['id_field']

        form = UploadExcelForm(request.POST, request.FILES)
        if form.is_valid():
            archivo_excel = form.cleaned_data["archivo_excel"]
            try:
                df = pd.read_excel(archivo_excel, engine='openpyxl')
                df = df.dropna(subset=[id_field])  # Eliminar filas con NaN en la columna del id
            except Exception as e:
                messages.error(request, f"Error al leer el archivo: {str(e)}")
                return redirect("admin:carga_masiva", catalogo=catalogo)

            usuario = request.user if request.user.is_authenticated else None

            for index, row in df.iterrows():
                try:
                    id_value = row[id_field]
                    if pd.isna(id_value):
                        raise ValueError(f"Field '{id_field}' cannot be NaN")

                    id_value = int(id_value)  # Convertir a entero

                    if catalogo == 'personas':
                        data = {
                            'identificacion': row['identificacion'],
                            'nombres': row['nombres'].title(),
                            'apellidos': row['apellidos'].title(),
                            'correo_personal': row.get('correo_personal','').lower() if not pd.isna(row.get('correo_personal', '')) else '',
                            'correo_institucional': row['correo_institucional'].lower(),
                            'id_centro_costo_id': row['id_centro_costo'],
                            'id_area_id': row['id_area'],
                            'id_region_id': row['id_region'],
                            'id_cargo_id': row['id_cargo'],
                            'fecha_ingreso_empresa': row['fecha_ingreso_empresa'],
                            'id_estado_persona_id': row['id_estado_persona'],
                            'direccion': row.get('direccion',''). title() if not pd.isna(row.get('direccion', '')) else '',
                        }
                    elif catalogo == 'equipos':
                        data = {
                            
                            'nombre_equipo': row['nombre_equipo'].upper(),
                            'modelo': row['modelo'].title(),
                            'sereal': row['serial'].upper(),
                            'id_marcaequipo': row['id_marcaequipo'],
                            'id_so': row['id_so'],
                            'id_ram': row['id_ram'],
                            'id_discoduro': row['id_discoduro'],
                            'anydesk': row['anydesk'],
                            'id_tipopropiedad': row['id_tipopropiedad'],
                            'id_tipoequipo': row['id_tipoequipo'],
                            'id_estadoequipo': row['id_estadoequipo'],
                            'id_coordinadores': row['id_coordinadores'],
                            'id_ubicacion': row['id_ubicacion'],
                            'procesador': row['procesador'],
                            'costo': row['costo'],
                            'observacion': row.get('observacion',''),
                        }
                    elif catalogo =='perifericos':
                        data={
                            'nombre_periferico':row['nombre_periferico'].title(),
                            'id_estado_periferico':row['id_estado_periferico'],
                            'modelo':row['modelo'].title(),
                            'sereal':row['sereal'].upper(),
                            'costo':row['costo']
                        }
                    elif catalogo== 'asignacion_equipos':
                        data={
                            'id_trabajador': row['id_trabajador'],
                            'id_equipo': row['id_equipo'],
                            'fecha_entrega_equipo': row['fecha_entrega_equipo'],
                            'fecha_devolucion_equipo': row['fecha_devolucion_equipo'],
                            'id_kit_perifericos': row['id_kit_perifericos'],
                        }
                    elif catalogo == 'contratos' :
                        data = {
                            'nombre' : row ['nombre'].title(),
                            'sereal' : row ['sereal'].upper(),
                            'fecha_inicio' : row ['fecha_inicio'],
                            'fecha_vencimiento' : row ['fecha_vencimiento'],
                            'cantidad_licencias' : row ['cantidad_licencias'],
                            'costo_unitario' : row ['costo_unitario'],
                            'costo_total' : row ['costo_total'],
                        }
                    else:
                        data = {
                            'nombre': row['nombre'],
                        }

                    obj, created = model.objects.update_or_create(
                        **{id_field: id_value},
                        defaults=data
                    )
                    
                    if catalogo == 'personas':
                        if created:
                            Historicos.objects.create(
                                usuario=usuario,
                                correo_usuario=usuario.email if usuario else 'anonimo@example.com',
                                tipo_cambio="Creacion Carga Masiva",
                                tipo_activo="Persona",
                                activo_modificado=obj.correo_institucional.lower(),
                                descripcion=f'Se creó el trabajador "{obj.nombres} {obj.apellidos}"'
                            )
                    else:
                        if created:
                            Historicos.objects.create(
                                usuario=usuario,
                                correo_usuario=usuario.email if usuario else 'anonimo@example.com',
                                tipo_cambio="Creacion Carga Masiva",
                                tipo_activo=catalogo.title(),
                                activo_modificado=obj.nombre,
                                descripcion=f'Se creó el registro "{obj.nombre}".'
                            )
                    
                except Exception as e:
                    messages.error(request, f"Error en la fila {index + 1}: {str(e)}")
                    continue

            # Actualizar la secuencia después de la carga
            update_sequence(model._meta.db_table, sequence, id_field)

            messages.success(request, "Datos cargados exitosamente.")
            return redirect("admin:index")

        return render(request, "admin/upload_excel.html", {"form": form, "catalogo": catalogo})