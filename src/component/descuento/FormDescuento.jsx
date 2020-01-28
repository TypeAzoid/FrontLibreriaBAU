import React from "react";
import ReactDOM from "react-dom";
import DescuentoService from "../../service/DescuentoService";

import { Button, Table } from "react-bootstrap";

import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalDialog from "react-bootstrap/ModalDialog";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

class FormDescuento extends React.Component {
  constructor(props) {
    super(props);
    this.descripcionChange = this.descripcionChange.bind(this);
    this.valorDescuentoChange = this.valorDescuentoChange.bind(this);

    this.state = {
      showModal: false,
      titulo: "",
      descripcion: "",
      valorDescuento: 0,
      id: this.props.id
    };

    this.openModal = this.openModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  isAgregar() {
    var newDescuento = this.state.id >= 0 ? "Editar" : "Agregar";
    this.setState({ titulo: newDescuento });
  }

  formAction() {
    if (this.state.titulo === "Agregar") {
      return this.agregar();
    } else {
      return this.editar();
    }
  }

  agregar() {
    var descripcion = this.state.descripcion;
    var valorDescuento = this.state.valorDescuento;

    console.log("la descripcion es:" + descripcion);
    console.log("el valor de descuento es:" + valorDescuento);
    DescuentoService.post(descripcion, valorDescuento).then(response => {
      window.open("http://localhost:3000/descuentos", "_self");
    });
  }

  editar() {
    var descripcion = this.state.descripcion;
    var valorDescuento = this.state.valorDescuento;
    var id = this.state.id;

    console.log("la descripcion es:" + descripcion);
    console.log("el valor de descuento es:" + valorDescuento);
    console.log("el id es:" + id);

    DescuentoService.edit(id, descripcion, valorDescuento).then(() => {
      window.open("http://localhost:3000/descuentos", "_self");
    });
  }

  descripcionChange(e) {
    this.setState({ descripcion: e.target.value });
  }

  valorDescuentoChange(e) {
    this.setState({ valorDescuento: e.target.value });
  }

  componentWillMount() {
    this.isAgregar();
  }

  openModal() {
    this.setState({
      showModal: true
    });
  }

  handleClose() {
    this.setState({
      showModal: false
    });
  }

  render() {
    let i = 0;

    return (
      <span>
        <Button
          variant={this.state.titulo === "Agregar" ? "info" : "secondary"}
          onClick={this.openModal}
          className="button"
        >
          {this.state.titulo}
        </Button>

        <Modal show={this.state.showModal} backdrop="static">
          <Modal.Header>
            <Modal.Title>
              <h1>{this.state.titulo}</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <span>Descripcion ---- </span>
              <span>Valor del descuento</span>
            </div>
            <input
              type="text"
              value={this.state.descripcion}
              placeholder={this.props.descripcion}
              onChange={this.descripcionChange}
              style={{ marginRight: 10 }}
            ></input>
            <input
              type="number"
              value={this.state.valorDescuento}
              onChange={this.valorDescuentoChange}
            ></input>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.formAction();
              }}
            >
              {this.state.titulo}
            </Button>
            <Button variant="danger" onClick={this.handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </span>
    );
  }
}

export default FormDescuento;
