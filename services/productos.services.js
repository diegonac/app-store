// Creamos una clase con todos los métodos que vamos a utilizar:
class productosService {
  constructor() {
		// El objeto de productos lo creamos aquí:
		// En esta ocación utilizaremos un array:
		this.productos = [
			{Nombre: "iPhone 13", Precio: "$270.000", id: "100"},
			{Nombre: "Samsung Galaxy S22", Precio: "$240.000", id:"101"},
		];
  };

  async buscar() {
		// Solamente se returna el array de productos:
		return this.productos;
  };

  async buscarId(id) {
		// Recibe como parámetro el id y luego:
		// (1)
		const index = this.productos.findIndex(index => index.id == id);

		// Verificamos si existe el producto
		if (index == -1) {
			throw "El producto no existe";
		};

		// Si existe no entrará en el if por lo tanto retornamos el
		// elemento:
		return this.productos[index];
  };

  async crear(body) {
		// Recibe el body y luego:
		// Guardamos el id del body:
		const id = body["id"];
		const index = this.productos.findIndex(index => index.id == id);

		// Comprobamos que no exista un producto con dicha id:
		// (2)
		if (index != -1) {
			throw "El producto ya existe, utilice otro id";
		};

		// Si el producto no existe en el array, lo creamos:
		this.productos.push(body);
		return body;
  };

  async modificar(id, body) {
		// Recibe como parámetro un id y un body, luego:
		const index = this.productos.findIndex(index => index.id == id);

		if (index == -1) {
			throw "El producto no existe";
		};

		// (3)
		const producto = this.productos[index];
		this.productos[index] = {
			...producto,
			...body,
		};

		return this.productos[index];
  };

  async modificarAtributo(id, propiedad, body) {
		// Recibe los parámetros id, propiedad y body, luego:
		const index = this.productos.findIndex(index => index.id == id);

		// Verifico que el producto y la propidad a modificar existan:
		if (index == -1 || !this.productos[index][`${propiedad}`]) {
			throw "El producto o el atributo seleccionado no existe";
		};

		this.productos[index][`${propiedad}`] = body;
		return this.productos[index];
	};

  async eliminar(id) {
		const index = this.productos.findIndex(index => index.id == id);
		if (index == -1) {
			throw "El producto no existe";
		};
		const producto = this.productos[index];
		this.productos.splice(index, 1);
		return producto;
  };
};

// Exportamos la clase:
export default productosService;
