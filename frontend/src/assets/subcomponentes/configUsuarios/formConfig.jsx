export const ALL_INPUT_IDS = [
  "username",
  "first_name",
  "last_name",
  "fecha_vencimiento",
  "email",
  "password",
  "confirm_password1",
  "group",


  "new_password",
  "confirm_password",
];

export const formFields = [
  { id: "username", label: "Nombre de usuario", type: "text", required: true },
  { id: "first_name", label: "Nombres", type: "text", required: true },
  { id: "last_name", label: "Apellidos", type: "text", required: true },
  { id: "email", label: "Correo electrónico", type: "text", required: true },
  { id: "password", label: "Contraseña", type: "password", required: true },
  { id: "confirm_password1", label: "Confirmar Contraseña", type: "password", required: true },
  { id: "group", label: "Rol", required: true, type: "select", options: [], }
];

export const formFields2 = [
  { id: "username", label: "Nombre de usuario", type: "text", required: true },
  { id: "first_name", label: "Nombres", type: "text", required: true },
  { id: "last_name", label: "Apellidos", type: "text", required: true },
  { id: "email", label: "Correo electrónico", type: "text", required: true },
  { id: "group", label: "Rol", required: true, type: "select", options: [], }
];

export const passwordFields = [
  { id: "new_password", label: "Nueva Contraseña", type: "password", required: true },
  { id: "confirm_password", label: "Confirmar Contraseña", type: "password", required: true }
];

