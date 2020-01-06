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
            cantidad: "",
            inicio: "",
            fin: "",
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

    cantidadChange = (e) => {
        this.setState({cantidad: e.target.value});
    }

    inicioChange = (e) => {
        this.setState({inicio: e.target.value});
    }

    finChange = (e) => {
        this.setState({fin: e.target.value});
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

    enviar() {

    }

    undisplay() {
        var elemento = document.getElementById("BSE");
        var elemento2 = document.getElementById("CSE");
        elemento.style.display = "none";
        elemento2.style.display = "none";
    }

    display() {
        var elemento = document.getElementById("BSE");
        var elemento2 = document.getElementById("CSE");
        elemento.style.display = "block";
        elemento2.style.display = "block";
    }

    render() {
        return(
            <React.Fragment>
                <div className="backgroundSuscripcionE" id="BSE"></div>
                <div className="SuscripcionE" id="CSE">
                    <div className="Selection">Id cliente  seleccionado: {this.state.idc}</div>
                    <div className="Selection">Id producto seleccionado: {this.state.idp}</div>
                    <div className="datecontainer">
                        Inicio <input type="date" className="Date" value={this.state.inicio} onChange={this.inicioChange}></input>
                    </div>
                    <div className="datecontainer">
                        Fin <input type="date" className="Date" value={this.state.fin} onChange={this.finChange}></input>
                    </div>
                    <input type="number" placeholder="cantidad" min="1" value={this.state.cantidad} onChange={this.cantidadChange} className="cantidad"></input>
                    <select className="SelectSuscripcion" value={this.state.busqueda} onChange={this.changeBusq}>
                        <option value="0">Cliente</option>
                        <option value="1">Producto</option>
                    </select>
                    <input type="text" className="inputNombre" placeholder="Buscar" value={this.state.buscador} onChange={this.busChange}></input>
                    <div className="SelectContainer">
                        <div id="showerSCL"><SuscripcionClienteList listado={this.state.clientes} 
                                                                    idc={this.changeIdc}/></div>
                        <div id="showerSPL"><SuscripcionProductoList listado={this.state.productos}
                                                                     idp={this.changeIdp}/></div>
                    </div>
                    <button className="botonEnviar" onClick={() => this.enviar()}>Enviar</button>
                    <button className="botonCancelar" onClick={() => this.undisplay()}>Cancelar</button>
                </div>
            </React.Fragment>
        );
    }

}

export default FormSuscripcion;