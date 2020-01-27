import React from 'react';
import './formsuscripcion.css';
import ClienteService from '../../service/ClienteService';
import SuscripcionClienteList from './suscripcionClienteList';
import SuscripcionProductoList from './suscripcionProductoList';
import axios from 'axios';
import SuscripcionService from '../../service/SuscripcionService';

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
            fin: "",
            ids: "",
            inicio: "",
            checkbox: false,
        }
        this.changeIdc = this.changeIdc.bind(this);
        this.changeIdp = this.changeIdp.bind(this);
    }

    async listarClientes(nombre) {
        let clientes = await ClienteService.obtenerClientes();
        await this.setState({clientes: clientes});
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

    checkChange = (e) => {
        this.setState({checkbox: e.target.value});
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

    enviar(cantidad,anual,idp,idc,fin) {
        if( cantidad !== "" && anual !== "" && idp !== "" && idc !== "" && fin !== "") {
            const c1 = parseInt(idp);
            const c2 = parseInt(idc);
            const c3 = parseInt(cantidad);
            SuscripcionService.agregarSuscripcion(c3,anual,c1,c2,fin).then( (sus) => {
                console.log("Suscripcion creada");
                alert("suscripcion creada");
                this.undisplay();
            })
        } else {
            alert("Los campos no pueden estar vacios");
            this.undisplay();
        }
    }

    undisplay() {
        var elemento = document.getElementById("BSE");
        var elemento2 = document.getElementById("CSE");
        var elemento3 = document.getElementById("PSC");
        elemento3.style.display = "block";
        elemento.style.display = "none";
        elemento2.style.display = "none";
        this.setState({busqueda: "0"});
        this.setState({buscador: ""});
        this.setState({idc: "-"});
        this.setState({idp: "-"});
        this.setState({cantidad: ""});
        this.setState({fin: ""});
        this.setState({inicio: ""});
        this.setState({idp: ""});
        this.setState({checkbox: false});
    }

    display() {
        var elemento = document.getElementById("BSE");
        var elemento2 = document.getElementById("CSE");
        elemento.style.display = "block";
        elemento2.style.display = "block";
    }
    
    componentDidMount() {
        setInterval(() => this.selectDisplay(this.state.busqueda),500);
    }

    render() {
        return(
            <React.Fragment>
                <div className="backgroundSuscripcionE" id="BSE"></div>
                <div className="SuscripcionE" id="CSE">
                    <div className="Selection">Id cliente  seleccionado: {this.state.idc}</div>
                    <div className="Selection">Id producto seleccionado: {this.state.idp}</div>
                    <div className="datecontainer">
                        Fin <input type="date" className="Date" value={this.state.fin} onChange={this.finChange}></input>
                    </div>
                    <select className="SelectSuscripcion" value={this.state.busqueda} onChange={this.changeBusq}>
                        <option value="0">Cliente</option>
                        <option value="1">Producto</option>
                    </select>
                    <input type="text" className="inputNombre" placeholder="Buscar" value={this.state.buscador} onChange={this.busChange}></input>
                    <div className="SelectContainer" id="PSC">
                        <div id="showerSCL"><SuscripcionClienteList listado={this.state.clientes} 
                                                                    idc={this.changeIdc}/></div>
                        <div id="showerSPL"><SuscripcionProductoList listado={this.state.productos}
                                                                     idp={this.changeIdp}/></div>
                    </div>
                    <button className="botonEnviar" onClick={() => this.enviar(this.state.cantidad,this.state.checkbox,this.state.idp,this.state.idc,this.state.fin)}>Enviar</button>
                    <button className="botonCancelar" onClick={() => this.undisplay()}>Cancelar</button>
                    <select className="SelectAnual" value={this.state.checkbox} onChange={this.checkChange}>
                        <option value={true}>Anual</option>
                        <option value={false}>No Anual</option>
                    </select>
                    <input type="number" placeholder="cantidad" min="1" value={this.state.cantidad} onChange={this.cantidadChange} className="cantidad"></input>
                </div>
            </React.Fragment>
        );
    }

}

export default FormSuscripcion;