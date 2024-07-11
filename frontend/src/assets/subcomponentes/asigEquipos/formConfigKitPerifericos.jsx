export const ALL_INPUT_IDS = [
  "id_perifericos",
  "nombre_periferico",
  "modelo",
  "sereal",
  "costo",
  // "id_estado_periferico"
];
export const formFields = [
  {
    id: "id_perifericos",
    label: "Perifericos",
    type: "select",
    required: true,
    options: [],
  },

];

export const formFields2 = [
  {
    id: "nombre_periferico",
    label: "Nombre Periferico",
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
    id: "costo",
    label: "Costo",
    type: "number",
    required: true,
  },
  // {
  //   id: "id_estado_periferico",
  //   label: "Estado Periferico",
  //   type: "select",
  //   required: true,
  //   options: [],
  // },
];


export const filterFields = [
];
