import express from "express";
import productosService from "../services/productos.services.js";

// Importamos los siguientes módulos:
import validatorHandler from "../middlewares/validator.handler.js";
import { buscarProductoSchema, crearProductoSchema, modificarProductoSchema } from "../schemas/productos.schemas.js";

const router = express.Router();
const service = new productosService();

router.get("/", async (req, res) => {
	res.json(await service.buscar());
});

// Ingresamos la función "validatorHandler" antes de l async de cada endpoint:
router.get("/:id",
  // Le pasamos como parámetro la función correspondiente al caso, aquí pondremos la de buscar por ID y
  // como segundo parámetro le pasamos de donde sacará los datos, en este caso de los "params":
  validatorHandler(buscarProductoSchema, "params"),
  async (req, res, next) => {
	  try {
		  const { id } = req.params;
		  const producto = await service.buscarId(id);
	  	res.json(producto);
	  } catch (error) {
	  	  next(error);
	  };
  }
);

// Para post hacemos lo mismo solo que con el middleware correspondiente:
	router.post("/crear",
    validatorHandler(crearProductoSchema, "body"),
    async (req, res, next) => {
      try {
        const body = req.body;
        const producto = await service.crear(body);
        res.status(201).json({
          message: "Creado",
          producto,
        });
      } catch (error) {
          next(error);
      };
    }
);

	router.put("/:id",
    validatorHandler(buscarProductoSchema, "params"),
    validatorHandler(modificarProductoSchema, "body"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const producto = await service.modificar(id, body);
        res.json({
          message: "Modificado",
          producto,
        });
      } catch (error) {
          next(error);
      };
    }
  );

	router.patch("/:id/",
    validatorHandler(buscarProductoSchema, "params"),
    validatorHandler(modificarProductoSchema, "body"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body =  req.body;
        const producto = await service.modificar(id, body);
        res.json({
          message: "Modificado",
          producto,
        });
      } catch (error) {
          next(error);
      };
    }
  );

	router.delete("/:id",
    validatorHandler(buscarProductoSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const producto = await service.eliminar(id);
        res.json({
          message: "Eliminado",
          producto,
        });
      } catch (error) {
          next(error);
      };
    }
  );

export default router;
