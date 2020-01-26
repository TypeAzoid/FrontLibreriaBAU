import React, { Component } from "react";
import "./FacturaAgregar.css";
import ClienteService from "../../service/ClienteService";
import Popup from "reactjs-popup";
import ProductoService from "../../service/ProductoService";
import axios from "axios";
import FacturaVerDetallesPopup from "./FacturaVerDetallesPopup";
import FacturaService from "../../service/FacturaService";
import { Button, Table } from "react-bootstrap";
import "../globalStyles.css";

import {Modal} from "react-bootstrap";

export default class FacturaAgregar extends Component {
  constructor(props) {
    super(props);

    this.slc_cliente = React.createRef();
    this.slc_descuentos = React.createRef();
    this.slc_productos = React.createRef();
    this.cantidad = React.createRef();

    this.state = {
      montoTotal: 0,
      clientes: [],
      productos: [],
      descuentos: [],
      misCompras: [] /* compra = productos - cantidad */,
      misDescuentos: []
    };

    this.listarClientes = this.listarClientes.bind(this);
    this.listarProductos = this.listarProductos.bind(this);
    this.listarDescuentos = this.listarDescuentos.bind(this);
    this.agregarDescuento = this.agregarDescuento.bind(this);
    this.agregarCompra = this.agregarCompra.bind(this);
    this.calcularMontoTotal = this.calcularMontoTotal.bind(this);
    this.agregarFactura = this.agregarFactura.bind(this);

    this.showModal = this.showModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    ClienteService.obtenerClientes().then(resp => {
      let listaClientes = resp.data;
      this.setState({
        clientes: listaClientes,
        showModal : false
      });
    });

    ProductoService.findAll().then(resp => {
      let listaProductos = resp.data;
      this.setState({
        productos: listaProductos
      });
    });

    axios.get("http://localhost:8080/api/v1/descuento").then(resp => {
      let listaDescuentos = resp.data;
      this.setState({
        descuentos: listaDescuentos
      });
    });
  }

  listarClientes() {
    return this.state.clientes.map(cliente => {
      return (
        <option key={cliente.id} value={cliente.id}>
          {cliente.id} : {cliente.name}
        </option>
      );
    });
  }

  listarProductos() {
    return this.state.productos.map(producto => {
      return (
        <option key={producto.id} value={producto.id}>
          {producto.id} : {producto.nombre}
        </option>
      );
    });
  }

  listarDescuentos() {
    return this.state.descuentos.map(descuento => {
      return (
        <option key={descuento.id} value={descuento.id}>
          {descuento.id} : {descuento.descripcion} :{" "}
          {descuento.valorDescuento * 100 + "%"}
        </option>
      );
    });
  }

  agregarCompra() {
    if (this.refs.cantidad.value <= 0) return;

    let productoElegido = this.state.productos.filter(
      prod => prod.id == this.refs.slc_productos.value
    );
    let compra = {
      producto: productoElegido[0],
      cantidad: this.refs.cantidad.value
    };
    let nuevasCompras = this.state.misCompras.concat(compra);
    /*
        this.setState({
            misCompras : nuevasCompras
        })*/

    this.calcularMontoTotal(nuevasCompras, true);
  }

  agregarDescuento() {
    let descuentoElegido = this.state.descuentos.filter(
      desc => desc.id == this.refs.slc_descuentos.value
    );
    let newDesc = this.state.misDescuentos.concat(descuentoElegido);
    /*
        this.setState({
            misDescuentos : newDesc
        })*/

    this.calcularMontoTotal(newDesc, false);
  }

  calcularMontoTotal(valor, isCompra) {
    if (isCompra) {
      if (valor.length == 0) return;

      let totalProductos = 0;
      valor.forEach(compra => {
        totalProductos += compra.producto.precio * compra.cantidad;
      });

      if (
        this.state.misDescuentos.length > 0 &&
        this.state.misCompras.length > 0
      ) {
        this.state.misDescuentos.forEach(desc => {
          totalProductos =
            totalProductos - totalProductos * desc.valorDescuento;
        });
      }

      totalProductos = totalProductos.toFixed(2);

      this.setState({
        montoTotal: totalProductos,
        misCompras: valor
      });
    } else {
      if (valor.length == 0) return;

      let totalProductos = 0;
      this.state.misCompras.forEach(compra => {
        totalProductos += compra.producto.precio * compra.cantidad;
      });

      if (valor.length > 0 && this.state.misCompras.length > 0) {
        valor.forEach(desc => {
          totalProductos =
            totalProductos - totalProductos * desc.valorDescuento;
        });
      }

      totalProductos = totalProductos.toFixed(2);

      this.setState({
        montoTotal: totalProductos,
        misDescuentos: valor
      });
    }
  }

  agregarFactura() {
    let mapCompras = this.state.misCompras.map(c => {
      return {
        productoId: c.producto.id,
        cantidad: c.cantidad
      };
    });

    let mapDescuentos = this.state.misDescuentos.map(desc => {
      return desc.id;
    });

    let factura = {
      clienteId: this.refs.slc_cliente.value,
      compras: mapCompras,
      descuentosId: mapDescuentos,
      pagado: false
    };
    FacturaService.guardarFactura(factura);
    window.open("/facturas", "_self");
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
    let i = 0;
    return (

      <div>
        <Button variant="info" className="button" onClick={this.showModal}>
        Agregar Factura
      </Button>

      <Modal show={this.state.showModal} onHide={this.handleClose} backdrop="static">
        <div className="agregar">
        <h1> Nueva Factura</h1>
        <div className="cliente">
          Cliente :<select ref="slc_cliente">{this.listarClientes()}</select>
        </div>
        <br />
        <div className="productos">
          <div className="prod_options">
            Productos
            <select ref="slc_productos">{this.listarProductos()}</select>
            &nbsp; Cantidad :
            <input
              ref="cantidad"
              type="number"
              placeholder="0"
              className="facturaAgregarInput"
            ></input>
            <Button onClick={this.agregarCompra}>Agregar</Button>
          </div>
          <div className="tblProductos">
            <Table variant="dark">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {this.state.misCompras.map(compra => {
                  return (
                    <tr key={compra.producto.id}>
                      <th>{compra.producto.nombre}</th>
                      <th>{compra.producto.precio}</th>
                      <th>{compra.cantidad}</th>
                      <th>{compra.producto.precio * compra.cantidad}</th>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="descuentos">
          Descuentos
          <select ref="slc_descuentos">{this.listarDescuentos()}</select>
          <Button onClick={this.agregarDescuento}>Agregar</Button>
          <div className="tablaDescuentos">
            <Table variant="dark">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Descripcion</th>
                  <th>Descuento</th>
                </tr>
              </thead>
              <tbody>
                {this.state.misDescuentos.map(descuento => {
                  return (
                    <tr key={i++}>
                      <th>{descuento.id}</th>
                      <th>{descuento.descripcion}</th>
                      <th>{descuento.valorDescuento}</th>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="opciones">
          Monto Total : {this.state.montoTotal}
          <Button variant="danger" onClick={this.handleClose}>
            Cancelar
          </Button>
          <Button variant="info" onClick={this.agregarFactura}>
            Agregar Factura
          </Button>
        </div>
      </div>
      </Modal>
      </div>
      
    );
  }
}
