class productosService {
  constructor() {
    this.productos = [{
      Nombre: "iPhone 13",
      Precio: "$300.000",
      id: 100,
    },{
      Nombre: "Samsung Galaxy S22",
      Precio: "$270.000",
      id: 101,
    }];
  };

  buscar() {
    return this.productos;
  };

  buscarId(id) {
    const index = this.productos.findIndex(index => index.id == id);
    if (index == -1) {
      throw "El producto no se ha encontrado";
    };
    return this.productos[index];
  };

  crear(body) {
    const id = body["id"];
    const index = this.productos.findIndex(index => index.id == id);
    if (index != -1) {
      throw "El producto ya existe, coloque otro id para crear un nuevo producto";
    };
    this.productos.push(body);
    return body;
  };

  modificar(id, body) {
    const index = this.productos.findIndex(index => index.id == id);
    if (index == -1) {
      throw "El producto no existe";
    };
    const producto = this.productos[index];
    this.productos[index] = {
      ...producto,
      ...body,
    };
    return this.productos[index];
  };

  modificarAtributo(id, propiedad, body) {
    const index = this.productos.findIndex(index => index.id == id);
    if (index == -1 || !this.productos[index][`${propiedad}`]) {
      throw "El producto o el atributo seleccionado no existe"
    };
    this.productos[index][`${propiedad}`] = body;
    return this.productos[index];
  };

  eliminar(id) {
    const index = this.productos.findIndex(index => index.id == id);
    if (index == -1) {
      throw "El producto no existe";
    };
    const producto = this.productos[index];
    this.productos.splice(index, 1);
    return producto;
  };
};

export default productosService;

