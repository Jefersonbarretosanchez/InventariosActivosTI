export const ALL_INPUT_IDS = [
    "nombre_equipo",
    "modelo",
    "sereal",
    "id_marca_equipo",
    "id_so",
    "id_procesador",
    "id_ram",
    "id_discoduro",
    "anydesk",
    "id_tipopropiedad",
    "id_tipoequipo",
    "id_estadoequipo",
    "id_coordinadores",
    "id_ubicacion"
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
    id: "id_marca_equipo",
    label: "Marca Equipo",
    type: "select",
    required: true,
    options: [
      { value: "", label: "" },
      { value: "Prueba", label: "Prueba 1" },
    ],
  },
  {
    id: "id_so",
    label: "Sistema Operativo",
    type: "select",
    required: true,
    options: [
      { value: "", label: "" },
      { value: "Prueba", label: "Prueba 1" },
    ],
  },
  {
    id: "id_procesador",
    label: "Procesador",
    type: "select",
    required: true,
    options: [
      { value: "", label: "" },
      { value: "Prueba", label: "Prueba 1" },
    ],
  },
  {
    id: "id_ram",
    label: "Memoria RAM",
    type: "select",
    required: true,
    options: [
      { value: "", label: "" },
      { value: "Prueba", label: "Prueba 1" },
    ],
  },
  {
    id: "id_discoduro",
    label: "Disco Duro",
    type: "select",
    required: true,
    options: [
      { value: "", label: "" },
      { value: "Prueba", label: "Prueba 1" },
    ],
  },
  {
    id: "id_tipopropiedad",
    label: "ATipo De Propiedad",
    type: "select",
    required: true,
    options: [
      { value: "", label: "" },
      { value: "Prueba", label: "Prueba 1" },
    ],
  },
  {
    id: "id_tipoequipo",
    label: "Tipo De Equipo",
    type: "select",
    required: true,
    options: [
      { value: "", label: "" },
      { value: "Prueba", label: "Prueba 1" },
    ],
  },
  {
    id: "id_estadoequipo",
    label: "Estado Equipo",
    type: "select",
    required: true,
    hidden:true,
    options: [
      { value: "", label: "" },
      { value: "Prueba", label: "Prueba 1" },
    ],
  },
  {
    id: "id_coordinadores",
    label: "Coordinador Bodega",
    type: "select",
    required: true,
    options: [
      { value: "", label: "" },
      { value: "Prueba", label: "Prueba 1" },
    ],
  },
  {
    id: "id_ubicacion",
    label: "Ubicación Bodega",
    type: "select",
    required: true,
    options: [
      { value: "", label: "" },
      { value: "Prueba", label: "Prueba 1" },
    ],
  },
];
