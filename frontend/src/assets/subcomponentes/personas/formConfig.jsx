export const ALL_INPUT_IDS = [
    "identificacion",
    "nombres",
    "apellidos",
    "correo_personal",
    "correo_institucional",
    "fecha_ingreso_empresa",
    "id_alianza",
    "id_area",
    "id_region",
    "id_cargo"
  ];

export const formFields = [
  {
    id: "identificacion",
    label: "N° Documento",
    type: "text",
    required: true,
  },
  {
    id: "nombres",
    label: "Nombres",
    type: "text",
    required: true,
  },
  {
    id: "apellidos",
    label: "Apellidos",
    type: "text",
    required: true,
  },
  {
    id: "correo_personal",
    label: "Correo Personal",
    type: "email",
    required: false,
  },
  {
    id: "correo_institucional",
    label: "Correo Institucional",
    type: "email",
    required: true,
  },
  {
    id: "fecha_ingreso_empresa",
    label: "Fecha De Ingreso",
    type: "date",
    required: true,
  },
  {
    id: "id_alianza",
    label: "Alianza",
    type: "select",
    required: true,
    options: [
      { value: "", label: "" },
      { value: "Prueba", label: "Prueba 1" },
    ],
  },
  {
    id: "id_area",
    label: "Area",
    type: "select",
    required: true,
    options: [
      { value: "", label: "" },
      { value: "Prueba", label: "Prueba 1" },
    ],
  },
  {
    id: "id_region",
    label: "Region",
    type: "select",
    required: true,
    options: [
      { value: "", label: "" },
      { value: "Prueba", label: "Prueba 1" },
    ],
  },
  {
    id: "id_cargo",
    label: "Cargo",
    type: "select",
    required: true,
    options: [
      { value: "", label: "" },
      { value: "Prueba", label: "Prueba 1" },
    ],
  },
  {
    id: "id_estado_persona",
    label: "Estado Persona",
    type: "select",
    required: true,
    hidden: true,
    options: [
      { value: "", label: "" },
      { value: "Prueba", label: "Prueba 1" },
    ],
  },
];
