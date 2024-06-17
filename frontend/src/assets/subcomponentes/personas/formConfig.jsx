export const ALL_INPUT_IDS = [
  "identificacion",
  "nombres",
  "apellidos",
  "correo_personal",
  "correo_institucional",
  "fecha_ingreso_empresa",
  "id_centro_costo",
  "id_area",
  "id_region",
  "id_cargo",
  "id_estado_persona"
];

export const formFields = [
  {
    name: "identificacion",
    id: "identificacion",
    label: "N° Documento",
    type: "text",
    required: true,
  },
  {
    name: "nombres",
    id: "nombres",
    label: "Nombres",
    type: "text",
    required: true,
  },
  {
    name: "apellidos",
    id: "apellidos",
    label: "Apellidos",
    type: "text",
    required: true,
  },
  {
    name: "correo_personal",
    id: "correo_personal",
    label: "Correo Personal",
    type: "email",
    required: false,
  },
  {
    name: "correo_institucional",
    id: "correo_institucional",
    label: "Correo Institucional",
    type: "email",
    required: true,
  },
  {
    name: "fecha_ingreso_empresa",
    id: "fecha_ingreso_empresa",
    label: "Fecha De Ingreso",
    type: "date",
    required: true,
  },
  {
    name: "id_centro_costo",
    id: "id_centro_costo",
    label: "Centro de Costo",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "id_area",
    label: "Area",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "id_region",
    label: "Region",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "id_cargo",
    label: "Cargo",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "id_estado_persona",
    label: "Estado Persona",
    type: "select",
    required: true,
    hidden: true,
    options: [],
  },
];

export const filterFields = [
  {
    id: "fecha_ingreso_empresa",
    label: "Fecha De Ingreso",
    type: "date",
    filter: true,
  },
  {
    id: "id_centro_costo",
    label: "Centro de Costo",
    type: "select",
    filter: true,
    options: [], // Opciones dinámicas
  },
  {
    id: "id_area",
    label: "Area",
    type: "select",
    filter: true,
    options: [], // Opciones dinámicas
  },
  {
    id: "id_region",
    label: "Region",
    type: "select",
    filter: true,
    options: [], // Opciones dinámicas
  },
  {
    id: "id_cargo",
    label: "Cargo",
    type: "select",
    filter: true,
    options: [], // Opciones dinámicas
  },
  {
    id: "id_estado_persona",
    label: "Estado Persona",
    type: "select",
    filter: true,
    options: [], // Opciones dinámicas
  },
];
