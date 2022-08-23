// Importamos joi:
import Joi from "joi";

// Creamos el formato que queremos que tengan los datos:
const id = Joi.string().alphanum();
const Nombre = Joi.string().min(3).max(30);
const Precio = Joi.number().integer().min(1);

// Creamos los objetos para cada endpoint específicando que propiedades son requeridas o no en cada caso:
const buscarProductoSchema = Joi.object({
  id: id.required(),
});

const crearProductoSchema = Joi.object({
  Nombre: Nombre.required(),
  Precio: Precio.required(),
  id: id.required(),
});

const modificarProductoSchema = Joi.object({
  Nombre: Nombre,
  Precio: Precio,
  id: id,
});

export { buscarProductoSchema, crearProductoSchema, modificarProductoSchema };
