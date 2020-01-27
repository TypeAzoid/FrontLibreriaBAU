/* eslint-disable default-case */
import React from "react";
import "./tabla.css";
import "./formProducto.css";
import FormProducto from "./FormProducto";
import Popup from "reactjs-popup";
import { Button, Table } from "react-bootstrap";
import { globalStyles } from "../bootstrap";
import "../globalStyles.css";

const styles = globalStyles;

class TablaProductos extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeParametro = this.onChangeParametro.bind(this);
    this.onChangeValorBusqueda = this.onChangeValorBusqueda.bind(this);

    this.state = {
      parametroDeBusqueda: "0",
      valorDeBusqueda: ""
    };
  }

  onChangeParametro(e) {
    const parametro = e.target.value;
    this.setState({ parametroDeBusqueda: parametro });
  }

  onChangeValorBusqueda(e) {
    const valor = e.target.value;
    this.setState({ valorDeBusqueda: valor });
  }

  renderTableData() {
    const lista = this.props.listado;
    var listaFiltrada = [];
    var parametroDeBusqueda = this.state.parametroDeBusqueda;
    var valorDeBusqueda = this.state.valorDeBusqueda;
    if (valorDeBusqueda !== "") {
      switch (parametroDeBusqueda) {
        case "0":
          const filtId = lista.filter(producto =>
            producto.id.toString().includes(valorDeBusqueda.toLowerCase())
          );
          listaFiltrada = filtId;
          break;

        case "1":
          const filtNombre = lista.filter(producto =>
            producto.nombre
              .toLowerCase()
              .includes(valorDeBusqueda.toLowerCase())
          );
          listaFiltrada = filtNombre;
          break;

        case "2":
          const filtTipo = lista.filter(producto =>
            producto.tipo.toLowerCase().includes(valorDeBusqueda.toLowerCase())
          );
          listaFiltrada = filtTipo;
          break;
      }
    } else {
      listaFiltrada = lista;
    }
    return listaFiltrada.map(producto => {
      const { id, nombre, tipo, precio } = producto; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{nombre}</td>
          <td>{tipo}</td>
          <td>{precio}</td>
          <td>
            <FormProducto id={id} />
            <Button className="button" variant="danger" className = "botonesConjuntos"
              onClick={() => {
                this.props.deleteProducto(id);
              }}
            >
              Borrar
            </Button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="bodyTable">
        <div className="overheadTable display-left">
          <select
            name="parametrosProducto"
            className="select"
            onChange={this.onChangeParametro}
          >
            <option value="0">Id</option>
            <option value="1">Nombre</option>
            <option value="2">Tipo</option>
          </select>
          <input
            type="text"
            onChange={this.onChangeValorBusqueda}
            className="input"
          />
          <FormProducto id={-1} />
        </div>
        <Table variant="dark" responsive className = "borderTabla">
          <thead>
            <tr >
              <th className = "tablaTopLeftRadius">Id</th>
              <th >Nombre</th>
              <th >Tipo de Producto</th>
              <th >Precio</th>
              <th className = "tablaTopRightRadius"> Acciones</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </Table>
      </div>
    );
  }
}
export default TablaProductos;
