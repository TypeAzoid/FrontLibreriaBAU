import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from "./component/home/home";
import Clientes from "./component/clientes/clientes";
import './App.css';
import Menu from './component/menu/menu';
import NF404 from './component/404NF/404NF';
import Suscripcion from './component/suscripcion/suscripcion';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <header>
          <Menu/>
        </header>
        <BrowserRouter>
            <Switch>
              <Route
                path="/home"
                component={Home} />
              <Route
                path="/clientes"
                render={() => <Clientes name="Clientes" />} />
                <Route
                path="/suscripciones"
                render={() => <Suscripcion name="Suscripciones" />} />
              <Route component={NF404}/>
            </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}
export default App;