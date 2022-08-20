import express from "express";
const router = express.Router();

const productos = {
	100: {
				Nombre: "iPhone 13",
				Precio: "$300.000",
				},
	101: {
				Nombre: "Samsung Galaxy S22",
				Precio: "$270.000",
				},
};

// Creamos un endpoint con el método get para que nos muestre los productos:
router.get("/", (req, res) => {
  res.json(productos);
});
// Creamos otro endpoint con el método get para que nos muestre un producto en específico:
router.get("/:id", (req, res) => {
  const { id } = req.params;
	if (productos[`${id}`]) {
			res.json(productos[`${id}`]);
	} else {
			res.status(404).send("Lo siento el producto no existe");
	};
});

// Creamos otro endpoint con el método post para crear productos:
router.post("/:id", (req, res) => {
	const { id } = req.params;
	const body = req.body;
	productos[`${id}`] = body;
  res.status(201).json({
    message: "Creado",
    body,
    id,
  });
});

// Creamos un endpoint con el método put para modificar los productos:
router.put("/:id", (req, res) => {
	const { id } = req.params;
	const body = req.body;
	if (productos[`${id}`]) {
		productos[`${id}`] = body;
		res.json({
		message: "Modificado",
		body,
		id,
		});
	} else {
			res.status(404).send(`Lo siento, el producto que usted quiere modificar no
			existe`);
	};
});

// Creamos un endpoint con el método patch para modificar parcialmente un
// producto:
router.patch("/:id/:propiedad", (req, res) => {
	const { id, propiedad } = req.params;
	const body = req.body;
	if (productos[`${id}`][`${propiedad}`]) {
		productos[`${id}`][`${propiedad}`] = body;
		res.json({
		message: "Modificado",
		body,
		id,
		});
	} else {
			res.status(404).send(`Lo siento, el producto o el atributo que usted quiere
			modificar no existe`);
	};
});

// Creamos un endpoint con el método delete para eliminar productos:
router.delete("/:id", (req, res) => {
	const { id } = req.params;
	if (productos[`${id}`]) {
		delete productos[`${id}`];
		res.json({
		message: "Eliminado",
		id,
	});
	} else {
		res.status(404).send("Lo siento, el producto que usted busca no existe");
	};
});

export default router;
