import React, { Component } from 'react'
import './FacturaAgregar.css'
import ClienteService from '../../service/ClienteService';
import Popup from 'reactjs-popup';
import ProductoService from '../../service/ProductoService';
import axios from "axios";
import FacturaVerDetallesPopup from './FacturaVerDetallesPopup';


export default class FacturaAgregar extends Component {
    constructor(props){
        super(props);

        this.state = {
            clientes : [],
            productos : [],
            descuentos : [],
            misProducots : [],
            misDescuentos : []
        }

        this.listarClientes = this.listarClientes.bind(this);
        this.listarProductos = this.listarProductos.bind(this);
        this.listarDescuentos = this.listarDescuentos.bind(this);
    }

    componentDidMount()
    {
        ClienteService.obtenerClientes()
        .then( resp => {
            let listaClientes = resp.data;
            this.setState({
                clientes : listaClientes
            })
        })

        ProductoService.findAll()
        .then( resp => {
            let listaProductos = resp.data;
            this.setState({
                productos : listaProductos
            })
        })

        axios.get("http://localhost:8080/api/v1/descuento").then( resp => {
            let listaDescuentos = resp.data;
            this.setState({
                descuentos : listaDescuentos
            })
            console.log(this.state.descuentos);
            
        })
    }

    listarClientes(){
        return this.state.clientes.map( cliente => {
            return (<option id={cliente.id}>
                        {cliente.id} : {cliente.name}
                    </option>)
        })
    }

    listarProductos(){
        return this.state.productos.map( producto => {
            return (<option id={producto.id}>
                        {producto.id} : {producto.nombre}
                    </option>)
        })
    }

    listarDescuentos(){
        return this.state.descuentos.map( descuento => {
            return (<option id={descuento.id} value={descuento.id}>
                        {descuento.id} : {descuento.descripcion} : {descuento.valorDescuento * 100 + '%'} 
                    </option>)
        })
    }

    agregarDescuento(descuento){
        
    }



    render() {
        return (
           
            <div className="agregar">
                <h1> Nueva Factura</h1>
                <br/>
                <div className="cliente">
                    Cliente :
                    <select id="slc_clientes">
                        {this.listarClientes()}
                    </select>
                </div>
                <div className="productos">
                    Productos 
                    <select id="slc_productos">
                        {this.listarProductos()}
                    </select>  
                    <button >Agregar</button>
                    
                </div>
                <div className="descuentos">
                    Descuentos 
                    <select id="slc_descuentos">
                        {this.listarDescuentos()}
                    </select>  
                    <button onClick={this.agregarDescuento()}>Agregar</button>
                    <div className="tablaDescuentos">
                        <table>
                            <tr>
                                <th>Id</th>
                                <th>Descripcion</th>
                                <th>Descuento</th>
                            </tr>
                            {this.state.misDescuentos.map(descuento =>{
                                return(
                                    <tr>
                                        <th>{descuento.id}</th>
                                        <th>{descuento.descripcion}</th>
                                        <th>{descuento.valorDescuento}</th>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
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
