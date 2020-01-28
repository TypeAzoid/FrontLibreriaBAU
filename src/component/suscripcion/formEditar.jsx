import React from 'react';
import './formsuscripcion.css'
import SuscripcionService from '../../service/SuscripcionService';

import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'

class FormEditar extends React.Component {
    constructor() {
        super();
        this.state = {
            fin: "",
            anual: false,
            cantidad: 1,
            showModal : false
        }
        this.display = this.display.bind(this);
        this.enviar = this.enviar.bind(this);
        this.undisplay = this.undisplay.bind(this);
        this.cantidadChange = this.cantidadChange.bind(this);
        this.finChange = this.finChange.bind(this);
        this.checkChange = this.checkChange.bind(this);
        this.enviar = this.enviar.bind(this);
    }

    async display(suscripcion) {
        await this.props.displayEditar(this.state.suscripcion.id);
        await this.setState({showModal: true});
        await this.setState({fin: suscripcion.fin});
        await this.setState({anual: suscripcion.anual});
        await this.setState({cantidad: suscripcion.cantidadMensual});
    }

    async undisplay() {
        await this.setState({showModal: false});
        var elemento3 = document.getElementById("cantidadTI");
        elemento3.style.marginLeft = "15.2%";
        await this.setState({fin: ""});
        await this.setState({anual: false});
        await this.setState({cantidad: 1});
    }

    async checkChange(e) {
        await this.setState({anual: e.target.value});
    }

    async cantidadChange(e) {
        await this.setState({cantidad: e.target.value});
    }

    async finChange(e) {
        await this.setState({fin: e.target.value});
    }

    async enviar() {
        /*SuscripcionService.editarSuscripcion(cantidad,anual,idp,idc,fin,inicio,ids).then( resp => {
            this.undisplay();
        });*/
        let cantidad = this.state.cantidad;
        let anual = this.state.anual;
        let fin = this.state.fin;
        this.props.editarSuscripcion(cantidad,anual,fin);
    }

    render(){
        return(
            <React.Fragment>

                <Button variant="secondary" className="button" onClick={this.display}>
                    Editar
                </Button>

                <Modal show={this.state.showModal}  backdrop="static">
                    <Modal.Header >
                        <Modal.Title>
                            <h1>Editar Suscripcion</h1>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="datecontainer">
                            Fin <input type="date" className="Date" value={this.state.fin} onChange={this.finChange}></input>
                        </div>
                        
                        <select className="SelectAnual" value={this.state.anual} onChange={this.checkChange}>
                            <option value={true}>Anual</option>
                            <option value={false}>No Anual</option>
                        </select>
                    
                        <input type="number" placeholder="cantidad" min="1" value={this.state.cantidad} onChange={this.cantidadChange} className="cantidad" id="cantidadTI"></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" className="button" onClick={() => this.enviar()}>Enviar</Button>
                        <Button variant="danger" className="button" onClick={() => this.undisplay()}>Cancelar</Button>
                    </Modal.Footer>
                </Modal>      

            </React.Fragment>
        );
    }
}

export default FormEditar;