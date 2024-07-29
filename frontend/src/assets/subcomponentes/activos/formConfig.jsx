export const ALL_INPUT_IDS = [
  "identificacion",
  "nombres",
  "apellidos",
  "correo_institucional",
  "nombre_centro_costo",
  "nombre_region",
  "nombre_cargo",
  "nombre_area",
  "fecha_ingreso_empresa",
  "nombre_estado_persona",
  "nombre_equipo",
  "anydesk",
  "nombre_licencia",
  "fecha_vencimiento",
  "nombre_aplicativo"
];

export const formFields = [
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
    name: "identificacion",
    id: "identificacion",
    label: "N° Documento",
    type: "number",
    required: true,
  },

  {
    id: "correo_institucional",
    label: "Correo Institucional",
    type: "email",
    required: true,
  },
  {
    id: "nombre_centro_costo",
    label: "Centro de Costo",
    type: "text",
    required: true,
  },
  {
    id: "nombre_region",
    label: "Región",
    type: "text",
    required: true,
  },
  {
    id: "nombre_cargo",
    label: "Cargo",
    type: "text",
    required: true,
  },
  {
    id: "nombre_area",
    label: "Área",
    type: "text",
    required: true,
  },

  {
    id: "fecha_ingreso_empresa",
    label: "Fecha de Ingreso a la Empresa",
    type: "date",
    required: true,
  },
  {
    id: "nombre_estado_persona",
    label: "Estado de la Persona",
    type: "text",
    required: true,
  },
  {
    id: "nombre_equipo",
    label: "Nombre del Equipo",
    type: "text",
    required: true,
  },
  {
    id: "anydesk",
    label: "Anydesk",
    type: "text",
    required: true,
  },
  {
    id: "nombre_licencia",
    label: "Nombre de la Licencia",
    type: "text",
    required: true,
  },
  {
    id: "fecha_vencimiento",
    label: "Fecha de Vencimiento",
    type: "date",
    required: true,
  },
  {
    id: "nombre_aplicativo",
    label: "Nombre del Aplicativo",
    type: "text",
    required: true,
  }
];

// const [filterFields, setFilterFields] = useState([
//   {
//     id: "nombre_centro_costo",
//     label: "Centro de Costo",
//     type: "select",
//     required: true,
//     options: [], // Opciones iniciales vacías
//   },
//   {
//     id: "nombre_equipo",
//     label: "Nombre del Equipo",
//     type: "text",
//     required: true,
//   },
// ]);

