import React, { Component } from "react";
import CuentaCorrienteDataService from "../service/CuentaCorrienteDataService";

class ListaCuentaCorrienteComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cuentas : [],
            message : null
        }
        this.refreshCuentas = this.refreshCuentas.bind(this)
        this.deleteCuentaCorrienteClicked = this.deleteCuentaCorrienteClicked.bind(this)
        this.updateCuentaCorrienteClicked = this.updateCuentaCorrienteClicked.bind(this)

    }

    componentDidMount() {
        this.refreshCuentas();
    }

    refreshCuentas() {
        CuentaCorrienteDataService.getAllCuentaCorriente()
            .then(
                response => {
                    console.log(response)
                    this.setState({cuentas : response.data})
                }
            )
    }

    deleteCuentaCorrienteClicked(id) {
        CuentaCorrienteDataService.deleteCuentaCorriente(id)
            .then(
                response => {
                        this.setState( {message: `Se borró la Cuenta Corriente ID: ${id}` })
                    this.refreshCuentas()
                }
            )
    }



    render() {
        return (
            <div className="container">
                <h3>Cuentas Corrientes</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id de Cuenta</th>
                                <th>Cliente</th>
                                <th>Id de Cliente</th>
                                <th>Monto Total</th>
                                <th> </th>


                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.cuentas.map(
                                    cuenta =>
                                        <tr key = {cuenta.id}>
                                            <td> {cuenta.id}</td>
                                            <td> {cuenta.cliente.name} </td>
                                            <td> {cuenta.cliente.id} </td>
                                            <td> {cuenta.montoTotal} </td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteCuentaCorrienteClicked(cuenta.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListaCuentaCorrienteComponent