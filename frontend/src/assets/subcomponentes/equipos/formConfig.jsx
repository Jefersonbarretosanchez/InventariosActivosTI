export const ALL_INPUT_IDS = [
  "nombre_equipo",
  "modelo",
  "sereal",
  "id_marcaequipo",
  "id_so",
  "procesador",
  "id_ram",
  "id_discoduro",
  "anydesk",
  "id_tipopropiedad",
  "id_tipoequipo",
  "id_coordinadores",
  "id_ubicacion",
  "costo",
  "observacion",
];

export const formFields = [
  {
    id: "nombre_equipo",
    label: "Nombre Equipo",
    type: "text",
    required: true,
  },
  {
    id: "modelo",
    label: "Modelo",
    type: "text",
    required: true,
  },
  {
    id: "sereal",
    label: "Serial",
    type: "text",
    required: true,
  },
  {
    id: "anydesk",
    label: "AnyDesk",
    type: "text",
    required: true,
  },
  {
    id: "id_marcaequipo",
    label: "Marca Equipo",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "id_so",
    label: "Sistema Operativo",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "procesador",
    label: "Procesador",
    type: "text",
    required: true,
  },
  {
    id: "id_ram",
    label: "Memoria RAM",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "id_discoduro",
    label: "Disco Duro",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "id_tipopropiedad",
    label: "Tipo De Propiedad",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "id_tipoequipo",
    label: "Tipo De Equipo",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "id_coordinadores",
    label: "Coordinador Bodega",
    type: "select",
    required: false,
    options: [],
  },
  {
    id: "id_ubicacion",
    label: "Ubicación Bodega",
    type: "select",
    required: false,
    options: [],
  },
  {
    id: "costo",
    label: "Costo Adquisición",
    type: "number",
    required: false,
  },
  {
    id: "observacion",
    label: "Observaciones",
    type: "text",
    required: false,
  },
];


export const filterFields = [

];

