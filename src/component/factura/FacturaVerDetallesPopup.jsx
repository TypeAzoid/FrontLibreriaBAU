import React, { Component } from 'react'

import './FacturaVerDetallesPopup.css'

import { Button, Table } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'

export default class FacturaVerDetallesPopup extends Component {
    constructor(props){
        super(props);

        this.state = {
            showModal : false
        }

        this.comprasTableHead = this.comprasTableHead.bind(this);
        this.descuentosTableHead = this.descuentosTableHead.bind(this);
        this.comprasTableBody = this.comprasTableBody.bind(this);
        this.descuentosTableBody = this.descuentosTableBody.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleClose = this.handleClose(this);
    }

    comprasTableHead(){
        return(
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
          )
    }

    comprasTableBody(){
        return(
            this.props.compras.map( compra => {
                    return(
                        <tr>
                            <th>{compra.producto.nombre}</th>
                            <th>{compra.producto.precio}</th>
                            <th>{compra.cantidad}</th>
                            <th>{compra.producto.precio * compra.cantidad}</th>
                        </tr>
                    )
                })
        )
    }

    descuentosTableHead(){
        return(
            <tr>
              <th>Id</th>
              <th>Descripcion</th>
              <th>Descuento</th>
            </tr>
            )
    }

    descuentosTableBody(){
        return(
                this.props.descuentos.map( descuento => {
                    return(
                        <tr>
                            <th>{descuento.id}</th>
                            <th>{descuento.descripcion}</th>
                            <th>{descuento.valorDescuento}</th>
                        </tr>
                    )
                })
        )
    }

    showModal(){
        this.setState({
            showModal : true
        })
    }
    handleClose(){
        this.setState({
            showModal : false
        })
    }

    render() {
        return (

            <div>
                <Button variant="info" onClick={this.showModal}> Ver </Button>

                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table className='facturaTavle'>
                            <thead>
                                { this.props.title === 'Compras' ? this.comprasTableHead() : this.descuentosTableHead()}
                            </thead>
                            <tbody>
                                { this.props.title === 'Compras' ? this.comprasTableBody() : this.descuentosTableBody()}
                            </tbody>
                        </Table>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
