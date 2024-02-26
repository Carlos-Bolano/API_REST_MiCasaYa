import Joi from "joi";

export const propertySchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "El título es requerido",
    "string.empty": "El título no puede estar vacío",
  }),
  description: Joi.string().required().messages({
    "any.required": "La descripción es requerida",
    "string.empty": "La descripción no puede estar vacía",
  }),
  neighborhood: Joi.string().required().messages({
    "any.required": "El barrio es requerido",
    "string.empty": "El barrio no puede estar vacío",
  }),
  address: Joi.string().required().messages({
    "any.required": "La dirección es requerida",
    "string.empty": "La dirección no puede estar vacía",
  }),
  price: Joi.string().required().messages({
    "any.required": "El precio es requerido",
    "number.base": "El precio debe ser un número",
  }),
  propertyType: Joi.string()
    .valid("casa", "apartamento", "otro")
    .required()
    .messages({
      "any.required": "El tipo de propiedad es requerido",
      "any.only": "Tipo de propiedad inválido",
    }),
  rooms: Joi.string().required().messages({
    "any.required": "La cantidad de habitaciones es requerida",
    "number.base": "La cantidad de habitaciones debe ser un número",
  }),
  images: Joi.any().messages({
    "any.required": "Las imágenes son requeridas",
    "any.invalid": "Las imágenes no son válidas",
  }),
});
