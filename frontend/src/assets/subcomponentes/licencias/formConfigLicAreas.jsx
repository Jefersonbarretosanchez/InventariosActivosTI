export const ALL_INPUT_IDS = [
  "nombre_licencia",
  "sereal",
  "fecha_vencimiento",
  "no_ticket",
  "cantidad",
  "id_centro_costo",
  "id_contrato",
  "id_estado_licencia",
  "id_responsable",
];

export const formFields = [
  {
    id: "nombre_licencia",
    label: "Nombre Licencia",
    type: "text",
    required: true,
  },
  {
    id: "sereal",
    label: "Codigo Activacion",
    type: "text",
    required: true,
  },
  {
    name: "fecha_vencimiento",
    id: "fecha_vencimiento",
    label: "Fecha De Vencimiento",
    type: "date",
    required: true,
  },
  {
    id: "no_ticket",
    label: "N° Ticket",
    type: "number",
    required: true,
  },
  {
    id: "cantidad",
    label: "Cantidad",
    type: "number",
    required: true,
  },
  {
    id: "id_centro_costo",
    label: "Centro de Costo",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "id_contrato",
    label: "Contrato",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "id_responsable",
    label: "Responsable",
    type: "select",
    required: true,
    options: [],
  },
  // {
  //   id: "id_estado_licencia",
  //   label: "Estado Licencia",
  //   type: "select",
  //   required: true,
  //   options: [],
  // },
];

export const filterFields = [
  {
    name: "fecha_vencimiento",
    id: "fecha_vencimiento",
    label: "Fecha De Vencimiento",
    type: "date",
    required: true,
  },
  {
    id: "no_ticket",
    label: "N° Ticket",
    type: "number",
    required: true,
  },
  {
    id: "id_contrato",
    label: "Contrato",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "id_centro_costo",
    label: "Centro de Costo",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "id_responsable",
    label: "Responsable",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "id_estado_licencia",
    label: "Estado Licencia",
    type: "select",
    required: true,
    options: [],
  },
];
