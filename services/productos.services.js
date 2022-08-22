// Importamos boom:
import boom from "@hapi/boom";

class productosService {
  constructor() {
		this.productos = [
			{Nombre: "iPhone 13", Precio: "$270.000", id: "100"},
			{Nombre: "Samsung Galaxy S22", Precio: "$240.000", id:"101"},
		];
  };

  async buscar() {
		return this.productos;
  };

  async buscarId(id) {
		const index = this.productos.findIndex(index => index.id == id);
		if (index == -1) {
			// Cambiamos en los throw los msjs por un boom:
			throw boom.notFound("El producto no existe");
		};
		return this.productos[index];
  };

  async crear(body) {
		const id = body["id"];
		const index = this.productos.findIndex(index => index.id == id);
		if (index != -1) {
			throw boom.conflict("El producto ya existe, seleccione otro id");
		};
		this.productos.push(body);
		return body;
  };

  async modificar(id, body) {
		const index = this.productos.findIndex(index => index.id == id);
		if (index == -1) {
			throw boom.notFound("El producto no existe");
		};
		const producto = this.productos[index];
		this.productos[index] = {
			...producto,
			...body,
		};
		return this.productos[index];
  };

  async modificarAtributo(id, propiedad, body) {
		const index = this.productos.findIndex(index => index.id == id);
		if (index == -1 || !this.productos[index][`${propiedad}`]) {
			throw boom.notFound(`El producto o el atributo seleccionado no existe`);
		};
		this.productos[index][`${propiedad}`] = body;
		return this.productos[index];
	};

  async eliminar(id) {
		const index = this.productos.findIndex(index => index.id == id);
		if (index == -1) {
			throw boom.notFound("El producto no existe");
		};
		const producto = this.productos[index];
		this.productos.splice(index, 1);
		return producto;
  };
};

export default productosService;
