import express from "express";
import productosService from "../services/productos.services.js";
const router = express.Router();
const service = new productosService();

router.get("/", (req, res) => {
  res.json(service.buscar());
});
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
	  const producto = service.buscarId(id);
    res.json(producto);
  } catch (error) {
    res.status(404).json({
      message: error
    });
  };
});

router.post("/crear", (req, res) => {
  try {
    const body = req.body;
    const producto = service.crear(body);
    res.status(201).json({
      message: "Creado",
      producto,
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  };

});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const producto = service.modificar(id, body);
		res.json({
		message: "Modificado",
		producto,
		});
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
});

router.patch("/:id/:propiedad", (req, res) => {
  try {
    const { id, propiedad } = req.params;
    const body = req.body;
    const producto = service.modificarAtributo(id, propiedad, body);
    res.json({
      message: "Modificado",
      producto,
      });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  };
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
		const producto = service.eliminar(id);
		res.json({
		message: "Eliminado",
		producto,
	});
  } catch (error) {
		res.status(404).json({
      message: error,
    });
  };
});

export default router;
