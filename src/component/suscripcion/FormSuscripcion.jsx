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
        this.selectDisplay = this.selectDisplay.bind(this);
        this.display = this.display.bind(this);
        this.undisplay = this.undisplay.bind(this);
        this.changeBusq = this.changeBusq.bind(this);
        this.finChange = this.finChange.bind(this);
        this.cantidadChange = this.cantidadChange.bind(this);
        this.checkChange = this.checkChange.bind(this);
        this.busChange = this.busChange.bind(this);
        this.enviar = this.enviar.bind(this);
    }

    async listarClientes(nombre) {
        let clientes = await ClienteService.obtenerClientes();
        await this.setState({clientes: clientes});
    }

    async listarProductos(nombre) {
        let resp = (await axios.get('http://localhost:8080/api/v1/producto/')).data;
        if(nombre !== "") {
            const data = resp.filter(filt => filt.tipo === "PRODUCTO_PERIODICO");
            const datan = data.filter(filt => filt.nombre.toLowerCase().includes(nombre.toLowerCase()));
            await this.setState({productos: datan});
        } else {
            const data = resp.filter(filt => filt.tipo === "PRODUCTO_PERIODICO");
            await this.setState({productos: data});
        }
    }

    async checkChange(e) {
        await this.setState({checkbox: e.target.value});
    }

    async changeIdc(id) {
        await this.setState({idc: id});
    }

    async changeIdp(id) {
        await this.setState({idp: id});
    }

    async busChange(e){
        await this.setState({buscador: e.target.value});
        this.selectDisplay(this.state.busqueda);
    }

    async cantidadChange(e) {
        await this.setState({cantidad: e.target.value});
    }

    async finChange(e){
        await this.setState({fin: e.target.value});
    }

    async changeBusq(e) {
        await this.setState({busqueda: e.target.value});
        this.selectDisplay(this.state.busqueda);
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
        this.props.crearSuscripcion(cantidad,anual,idp,idc,fin);
    }

    async undisplay() {
        var elemento = document.getElementById("BSE");
        var elemento2 = document.getElementById("CSE");
        var elemento3 = document.getElementById("PSC");
        await this.setState({busqueda: "0"});
        await this.setState({buscador: ""});
        await this.setState({idc: "-"});
        await this.setState({idp: "-"});
        await this.setState({cantidad: ""});
        await this.setState({fin: ""});
        await this.setState({inicio: ""});
        await this.setState({idp: ""});
        await this.setState({checkbox: false});
        elemento3.style.display = "block";
        elemento.style.display = "none";
        elemento2.style.display = "none";
    }

    display() {
        var elemento = document.getElementById("BSE");
        var elemento2 = document.getElementById("CSE");
        elemento.style.display = "block";
        elemento2.style.display = "block";
        this.selectDisplay(this.state.busqueda);
    }
    
    componentDidMount() {
        this.selectDisplay(this.state.busqueda);
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