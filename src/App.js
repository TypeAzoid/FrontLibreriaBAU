import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./component/home/home";
import Clientes from "./component/clientes/clientes";
import Producto from "./component/producto/Producto";
import Facturas from "./component/factura/Facturas";
import Descuento from "./component/descuento/Descuento";
import "./App.css";
import Menu from "./component/menu/menu";
import NF404 from "./component/404NF/404NF";
import FormProducto from "./component/producto/FormProducto";
import Suscripcion from "./component/suscripcion/suscripcion";

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Menu />
        </header>
        <BrowserRouter>
          <Switch>
            <Route path="/home" component={Home} />
            <Route
              path="/clientes"
              render={() => <Clientes name="Clientes" />}
            />
            <Route
              path="/producto"
              render={() => <Producto name="Productos" />}
            />
            <Route
              path="/suscripciones"
              render={() => <Suscripcion name="Suscripciones" />}
            />
            <Route
              path="/facturas"
              render={() => <Facturas name="Facturas" />}
            />
            <Route
              path="/Descuentos"
              render={() => <Descuento name="Descuentos" />}
            />
            <Route
              path="/"
              render={() => <Home name="Home" />}
            />
            <Route component={NF404} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
