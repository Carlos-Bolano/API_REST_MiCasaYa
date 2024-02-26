import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "nombre de usuario es requerido",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": "email invalido",
      "any.required": "email es requerido",
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": "contraseña debe tener al menos 6 caracteres",
    "any.required": "contraseña es requerida",
  }),
  phone: Joi.string().allow("").optional(), // Make phone optional
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": "email invalido",
      "any.required": "email es requerido",
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": "contraseña debe tener al menos 6 caracteres",
    "any.required": "contraseña es requerida",
  }),
});
