import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./component/home/home";
import Clientes from "./component/clientes/clientes";
import './App.css';

function App() {
  return (
    <Router>
    <div>
      <header>
        <div className="menu"><a href="/" className="Button">Inicio</a><a href="/clientes" className="Button">Clientes</a></div>
      </header>
        <Route path="/" component={Home} />
        <Route path="/clientes" component={Clientes} />
    </div>
    </Router>
  );
}

export default App;