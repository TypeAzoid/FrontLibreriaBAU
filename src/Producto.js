import React from "react";
import ReactDOM from "react-dom";
import TablaProductos from "./TablaProductos";
import ProductoService from "./service.jsx/ProductoService";

class Producto extends React.Component {
  constructor(props) {
    super(props);
    this.refreshProductos = this.refreshProductos.bind(this);
    this.deleteProducto = this.deleteProducto.bind(this);
    this.getOne = this.getOne.bind(this);
    this.state = {
      productos: [],
      nombre: "",
      tipo: "",
      precio: 0
    };
  }

  componentDidMount() {
    this.refreshProductos();
  }

  refreshProductos() {
    ProductoService.findAll() //HARDCODED
      .then(response => {
        console.log(response);
        this.setState({ productos: response.data });
      });
  }

  deleteProducto(id) {
    ProductoService.delete(id).then(response => {
      this.refreshProductos();
    });
  }

  getOne(id) {
    ProductoService.findOne(id).then(response => {
      this.refreshProductos();
    });
  }

  render() {
    return (
      <div className="tablaProductos">
        <TablaProductos
          listado={this.state.productos}
          deleteProducto={this.deleteProducto}
          getOne={this.getOne}
        />
      </div>
    );
  }
}
export default Producto;
