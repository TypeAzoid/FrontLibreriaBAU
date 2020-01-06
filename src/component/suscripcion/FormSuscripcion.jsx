import React from 'react';
import './formsuscripcion.css';
import ClienteService from '../../service/ClienteService';
import SuscripcionClienteList from './suscripcionClienteList';
import SuscripcionProductoList from './suscripcionProductoList';
import axios from 'axios';

class FormSuscripcion extends React.Component {
    constructor() {
        super();
        this.state = {
            clientes: [],
            productos: [],
            busqueda: "0",
            buscador: "",
            idc: "-",
            idp: "-",
        }
        this.changeIdc = this.changeIdc.bind(this);
        this.changeIdp = this.changeIdp.bind(this);
    }

    listarClientes(nombre) {
        ClienteService.obtenerClientes().then(resp => {
            if(nombre !== "") {
                const data = resp.data.filter(filt => filt.name.toLowerCase().includes(nombre.toLowerCase()));
                this.setState({clientes: data});
            } else {
                this.setState({clientes: resp.data});
            }
        })
    }

    listarProductos(nombre) {
        axios.get('http://localhost:8080/api/v1/producto/').then(resp => {
            if(nombre !== "") {
                const data = resp.data.filter(filt => filt.tipo === "PRODUCTO_PERIODICO");
                const datan = data.filter(filt => filt.nombre.toLowerCase().includes(nombre.toLowerCase()));
                this.setState({productos: datan});
            } else {
                const data = resp.data.filter(filt => filt.tipo === "PRODUCTO_PERIODICO");
                this.setState({productos: data});
            }
        });
    }

    changeIdc(id) {
        this.setState({idc: id});
    }

    changeIdp(id) {
        this.setState({idp: id});
    }

    busChange = (e) => {
        this.setState({buscador: e.target.value});
    }

    changeBusq = (e) => {
        this.setState({busqueda: e.target.value});
    }

    selectDisplay(estado) {
        var elemento = document.getElementById("showerSCL");
        var elemento2 = document.getElementById("showerSPL");
        if(estado === "0") {
            elemento.style.display = "block";
            elemento2.style.display = "none";
            this.listarClientes(this.state.buscador);
        } else if(estado === "1") {
            elemento.style.display = "none";
            elemento2.style.display = "block";
            this.listarProductos(this.state.buscador);
        }
    }

    componentDidMount() {
        setInterval(() => this.selectDisplay(this.state.busqueda),500);
    }

    render() {
        return(
            <React.Fragment>
                <div className="backgroundSuscripcionE"></div>
                <div className="SuscripcionE">
                    <div className="Selection">Id cliente  seleccionado: {this.state.idc}</div>
                    <div className="Selection">Id producto seleccionado: {this.state.idp}</div>
                    Inicio <input type="date" id="Test_Date"></input>
                    Fin <input type="date" id="Test_Date"></input>
                    <input type="number" placeholder="cantidad" min="1"></input>
                    <select className="SelectSuscripcion" value={this.state.busqueda} onChange={this.changeBusq}>
                        <option value="0">Cliente</option>
                        <option value="1">Producto</option>
                    </select>
                    <input type="text" classname="inputNombre" placeholder="<=== Buscar por" value={this.state.buscador} onChange={this.busChange}></input>
                    <div className="SelectContainer">
                        <div id="showerSCL"><SuscripcionClienteList listado={this.state.clientes} 
                                                                    idc={this.changeIdc}/></div>
                        <div id="showerSPL"><SuscripcionProductoList listado={this.state.productos}
                                                                     idp={this.changeIdp}/></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default FormSuscripcion;