import React from 'react';
import './formsuscripcion.css';
import ClienteService from '../../service/ClienteService';
import SuscripcionClienteList from './suscripcionClienteList';
import SuscripcionProductoList from './suscripcionProductoList';
import axios from 'axios';
import SuscripcionService from '../../service/SuscripcionService';

import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'

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
            showModal : false
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
        if(!this.state.showModal) return;

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
        this.setState({
            openModal : true
        })
    }

    enviar(cantidad,anual,idp,idc,fin) {
        this.props.crearSuscripcion(cantidad,anual,idp,idc,fin);
    }

    async undisplay() {
        await this.setState({showModal: false});
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
        await this.setState({
            openModal : false
        })
    }

    async display() {
         await this.setState({
            showModal : true
        })
        this.selectDisplay(this.state.busqueda);
    }
    
    componentDidMount() {
        this.selectDisplay(this.state.busqueda);
    }
    

    render() {
        return(
            <React.Fragment>

                <Button variant="info" className="button" onClick={this.display}>
                    Agregar
                </Button>

                <Modal show={this.state.showModal}  backdrop="static">
                    <Modal.Header >
                        <Modal.Title>
                        <h1>Agregar Suscripcion</h1>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <input type="number" placeholder="cantidad" min="1" value={this.state.cantidad} onChange={this.cantidadChange} className="cantidad"></input>
                        
                        <select className="SelectAnual" value={this.state.checkbox} onChange={this.checkChange}>
                            <option value={true}>Anual</option>
                            <option value={false}>No Anual</option>
                        </select>

                        <Button variant="info" className="button" 
                            onClick={() => this.enviar(this.state.cantidad,this.state.checkbox,this.state.idp,this.state.idc,this.state.fin)}>
                                Enviar
                        </Button>
                        <Button variant="danger" className="button" onClick={() => this.undisplay()}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>      
              
            </React.Fragment>
        );
    }

}

export default FormSuscripcion;