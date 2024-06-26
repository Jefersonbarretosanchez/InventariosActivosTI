export const ALL_INPUT_IDS = [
  "nombre",
  "sereal",
  "fecha_inicio",
  "fecha_vencimiento",
  "cantidad_licencias",
  "costo_unitario",
  "costo_total",
];

export const formFields = [
  {
    id: "nombre",
    label: "Nombre Contrato",
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
    id: "fecha_inicio",
    label: "Fecha de Inicio ",
    type: "date",
    required: false,
  },
  {
    id: "fecha_vencimiento",
    label: "Fecha De Vencimiento",
    type: "date",
    required: true,
  },
  {
    id: "cantidad_licencias",
    label: "Cantidad de Licencias",
    type: "number",
    required: true,
  },
  {
    id: "costo_unitario",
    label: "Costo Unitario",
    type: "number",
    required: true,
  },
  {
    id: "costo_total",
    label: "Costo Total",
    type: "number",
    required: true,
  },
];

export const filterFields = [

];
