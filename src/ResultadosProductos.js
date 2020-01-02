import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { render, findAllByAltText } from "@testing-library/react";
import Producto from "./Producto";

class results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productos: []
    };
  }

  componentDidMount() {
    libreriaAPI.find({}).then(data => {
      let productos;

      this.setState({
        productos
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Resultados</h1>
        {this.state.productos.map(producto => {
          return (
            <Producto
              key={producto.id}
              nombre={producto.nombre}
              tipoDeProducto={producto.tipoDeProducto}
              precio={producto.precio}
            />
          );
        })}
        <TablaProductos />
      </div>
    );
  }
}

export default results;
