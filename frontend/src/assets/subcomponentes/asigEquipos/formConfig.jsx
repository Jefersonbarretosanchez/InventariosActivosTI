export const ALL_INPUT_IDS = [
  "fecha_entrega_equipo",
  "fecha_devolucion_equipo",
  "id_equipo",
  "id_trabajador",
  "id_kit_perifericos",

  "id_coordinadores",
  "id_ubicacion",
];

export const formFields = [
  {
    id: "id_trabajador",
    label: "Empleado",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "id_equipo",
    label: "Equipo",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "fecha_entrega_equipo",
    label: "Fecha Entrega Equipo",
    type: "date",
    required: true,
  },
  {
    id: "fecha_devolucion_equipo",
    label: "Fecha Devolucion Equipo",
    type: "date",
    required: true,
  },


  {
    id: "id_kit_perifericos",
    label: "Kit de perifericos",
    type: "select",
    required: true,
    options: [],
  },
];

export const formFields2 = [
  {
    id: "id_equipo",
    label: "Equipo",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "id_trabajador",
    label: "Empleado",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "fecha_devolucion_equipo",
    label: "Fecha Devolucion Equipo",
    type: "date",
    required: true,
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
];

export const filterFields = [

  {
    id: "fecha_entrega_equipo",
    label: "Fecha Entrega Equipo",
    type: "date",
    required: true,
  },
  {
    id: "fecha_devolucion_equipo",
    label: "Fecha Devolucion Equipo",
    type: "date",
    required: true,
  },
];
