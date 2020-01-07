import React, { Component } from 'react'
import './FacturaAgregar.css'
import ClienteService from '../../service/ClienteService';

export default class FacturaAgregar extends Component {
    constructor(props){
        super(props);

    }

    listarClientes(){
        return <React.Fragment>
            {ClienteService.listarClientes()
                .then(resp =>{
                    let clientes = resp.data;
                    return clientes.map( cliente =>{
                        return(
                            <option id={cliente.name}>{cliente}</option>
                        )
                    })
            })}
        </React.Fragment>
    }

    render() {
        return (
            <div className="agregar">
                <h1> Nueva Factura</h1>
                <br/>
                <div className="cliente">
                    Cliente :
                    <select>

                    </select>
                </div>
                <div className="productos">
                    Productos
                </div>
                <div className="descuentos">
                    Descuentos
                </div>
                <div className="opciones">
                    Monto Total : 
                    <button> Cancelar</button>
                    <button> Agregar Factura</button>
                </div>
            </div>
        )
    }
}
