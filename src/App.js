import React from "react";
import "./App.css";
import { render, findAllByAltText } from "@testing-library/react";
import ResultadosProducto from "./ResultadosProductos";
import { Router, Link } from "@reach/router";
import Producto from "./Producto";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/producto">Productos</Link>
        </header>
        <Router>
          <Producto path="/producto" />
        </Router>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
