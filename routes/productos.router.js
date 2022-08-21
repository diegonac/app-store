import express from "express";
import productosService from "../services/productos.services.js";
const router = express.Router();
const service = new productosService();

router.get("/", async (req, res) => {
	res.json(await service.buscar());
});

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const producto = await service.buscarId(id);
		res.json(producto);
	} catch (error) {
		res.status(404).json({
			message: error,
		});
	};
});

	router.post("/crear", async (req, res) => {
		try {
			const body = req.body;
			const producto = await service.crear(body);
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

	router.put("/:id", async (req, res) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const producto = await service.modificar(id, body);
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

	router.patch("/:id/:propiedad", async (req, res) => {
		try {
			const { id, propiedad } = req.params;
			const body =  req.body;
			const producto = await service.modificarAtributo(id, propiedad, body);
			res.json({
				message: "Modificado",
				producto,
			});
		} catch (error) {
			res.status(404).json({
				meesage: error,
			});
		};
	});

	router.delete("/:id", async (req, res) => {
		try {
			const { id } = req.params;
			const producto = await service.eliminar(id);
			res.json({
				message: "Eliminado",
				producto,
			});
		} catch (error) {
				res.status(404).json({
					meesage: error,
				});
		};
	});

export default router;
