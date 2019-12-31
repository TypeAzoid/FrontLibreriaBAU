import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./component/home/home";
import Clientes from "./component/clientes/clientes";
import './App.css';
import Menu from './component/menu/menu';

function App() {
  return (
    <Router>
    <div>
      <header>
        <Menu/>
      </header>
        <Route path="/" component={Home} />
        <Route path="/clientes" component={Clientes} />
    </div>
    </Router>
  );
}

export default App;