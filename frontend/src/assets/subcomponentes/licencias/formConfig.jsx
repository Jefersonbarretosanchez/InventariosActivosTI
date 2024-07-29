export const ALL_INPUT_IDS = [
  "nombre_licencia",
  "sereal",
  "fecha_vencimiento",
  "no_ticket",
  "id_contrato",
  "id_solicitante",
  // "id_estado_licencia"
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
    id: "id_contrato",
    label: "Contrato",
    type: "select",
    required: true,
    options: [],
  },
  {
    id: "id_solicitante",
    label: "Persona Solicitante",
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
    id: "id_solicitante",
    label: "Persona Solicitante",
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
