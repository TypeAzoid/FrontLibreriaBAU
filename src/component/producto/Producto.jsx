import React from "react";
import ReactDOM from "react-dom";
import TablaProductos from "./TablaProductos";
import ProductoService from "../../service/ProductoService";

class Producto extends React.Component {
  constructor(props) {
    super(props);
    this.listProductos = this.listProductos.bind(this);
    this.deleteProducto = this.deleteProducto.bind(this);
    this.getOne = this.getOne.bind(this);

    this.state = {
      parametroDeBusqueda: "0",
      valorDeBusqueda: "",
      productos: [],
      nombre: "",
      tipo: "",
      precio: 0
    };
  }

  componentDidMount() {
    this.listProductos();
  }

  componentWillUpdate(nextProps, nextState) {
    this.listProductos();
  }

  listProductos() {
    ProductoService.findAll().then(response => {
      var resultado = response.data;
      this.setState({ productos: resultado });
    });
  }

  deleteProducto(id) {
    ProductoService.delete(id).then(response => {
      this.listProductos();
    });
  }

  getOne(id) {
    ProductoService.findOne(id).then(response => {
      this.listProductos();
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
