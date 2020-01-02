import React, { Component } from 'react';
import ListaCuentaCorrienteComponent from "./ListaCuentaCorrienteComponent";
import CuentaCorrienteComponent from "./CuentaCorrienteComponent";
import Switch from "react-router-dom/es/Switch";
import { BrowserRouter as Router, Route } from 'react-router-dom'

class CuentaCorrienteApp extends Component {
    render () {
        return (
                <Router>
                    <>
                        <h1>Libreria App! </h1>
                        <Switch>
                            <Route path="/" exact component={ListaCuentaCorrienteComponent} />
                            <Route path="/cuentacorriente" exact component={ListaCuentaCorrienteComponent} />
                            <Route path="/cuentacorriente/:id" component={CuentaCorrienteComponent} />
                        </Switch>
                    </>
                </Router>
        )
    }
}

export default CuentaCorrienteApp
