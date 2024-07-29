export const ALL_INPUT_IDS = [
  "fecha_registro",
  "nombre_usuario",
  "correo_usuario",
  "tipo_cambio",
  "tipo_activo",
  "activo_modificado",
  "descripcion",
];

export const formFields = [
  {
    id: "fecha_registro",
    label: "Fecha de Registro",
    type: "text",
    required: true,
  },
  {
    id: "nombre_usuario",
    label: "Nombre de Usuario",
    type: "text",
    required: true,
  },
  {
    id: "correo_usuario",
    label: "Correo de Usuario",
    type: "text",
    required: true,
  },
  {
    id: "tipo_cambio",
    label: "Tipo de Cambio",
    type: "text",
    required: true,
  },
  {
    id: "tipo_activo",
    label: "Tipo de Activo",
    type: "text",
    required: true,
  },
  {
    id: "activo_modificado",
    label: "Activo Modificado",
    type: "text",
    required: true,
  },
  {
    id: "descripcion",
    label: "Descripcion",
    type: "textarea",
    required: true,
  },
];

export const formFields2 = [

];

export const filterFields = [
  {
    id: "nombre_usuario",
    label: "Nombre de Usuario",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "correo_usuario",
    label: "Correo de Usuario",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "tipo_cambio",
    label: "Tipo de Cambio",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "tipo_activo",
    label: "Tipo de Activo",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "fecha_registro",
    label: "Fecha de Registro",
    type: "date",
    required: true,
  },
];
