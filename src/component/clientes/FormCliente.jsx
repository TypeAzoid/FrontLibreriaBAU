import React from 'react';
import Component from 'react';
import Clientes from './clientes';
import { Button } from "react-bootstrap";

import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalDialog from "react-bootstrap/ModalDialog";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

class FormCliente extends React.Component {
    constructor () {
        super();
        this.state = {
            showModal : false,
            nombrel: "",
            direccionl: "",
        };

        this.displayeditar = this.displayeditar.bind(this);
    };

    nameChange = (e) =>{ 
        this.setState({nombrel: e.target.value});
    }
  
    dirChange = (e) =>{ 
        this.setState({direccionl: e.target.value});
    }

    async undisplayeditar(){
        await this.setState({nombrel: ""});
        await this.setState({direccionl: ""});
        await this.setState({
            showModal : false
        })
    }

    displayeditar(){
        this.setState({
            showModal : true
        })
    }
    
    render() {
        return(
            <React.Fragment>

                <Button variant="info" onClick={this.displayeditar}> Agregar </Button>

                <Modal show={this.state.showModal} backdrop="static">
                    <Modal.Header >
                        <Modal.Title>
                            <h1>{this.props.clienteId == 0 ? "Agregar" : "Editar"}</h1>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" className="editarnombre" placeholder={this.props.clienteNombre} value={this.state.nombrel} onChange={this.nameChange}></input>
                        <input type="text" className="editardireccion" placeholder={this.props.clienteDireccion} value={this.state.direccionl} onChange={this.dirChange}></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonagregar" onClick={() => this.props.concreteEdit(this.state.nombrel,this.state.direccionl)}>Enviar</Button>
                        <Button className="botoncancelar" onClick={() => this.undisplayeditar()}>Cancelar</Button>
                    </Modal.Footer>
                </Modal>

            </React.Fragment>
        );
    }
}

export default FormCliente;