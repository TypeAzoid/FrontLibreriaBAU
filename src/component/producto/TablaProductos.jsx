/* eslint-disable default-case */
import React from "react";
import "./tabla.css";
import "./form.css";
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
        <tr className="trProductos" key={id}>
          <td className="tdProductos">{id}</td>
          <td className="tdProductos">{nombre}</td>
          <td className="tdProductos">{tipo}</td>
          <td className="tdProductos">{precio}</td>
          <td className="tdProductos">
            <Button
              className="button"
              variant="danger"
              onClick={() => {
                this.props.deleteProducto(id);
              }}
            >
              Borrar
            </Button>

            <FormProducto id={id} />
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
        <Table variant="dark" className="table" id="productos" responsive>
          <thead>
            <tr className="trProductos">
              <th className="tdProductos">Id</th>
              <th className="tdProductos">Nombre</th>
              <th className="tdProductos">Tipo de Producto</th>
              <th className="tdProductos">Precio</th>
              <th className="tdProductos"> Acciones</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </Table>
      </div>
    );
  }
}
export default TablaProductos;
