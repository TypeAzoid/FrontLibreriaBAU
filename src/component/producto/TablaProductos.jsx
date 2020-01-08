/* eslint-disable default-case */
import React from "react";
import "./tabla.css";
import "./form.css";
import FormProducto from "./FormProducto";
import Popup from "reactjs-popup";

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
            <button
              variant="danger"
              onClick={() => {
                this.props.deleteProducto(id);
              }}
            >
              Borrar
            </button>
            <Popup modal trigger={<button> Editar </button>}>
              <FormProducto id={id} />
            </Popup>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="bodyTable">
        <div className="overheadProductos">
          <select
            name="parametrosProducto"
            className="parametrosProducto"
            onChange={this.onChangeParametro}
          >
            <option value="0">Id</option>
            <option value="1">Nombre</option>
            <option value="2">Tipo</option>
          </select>
          <input
            type="text"
            onChange={this.onChangeValorBusqueda}
            className="inputTablaProducto"
          />
          <Popup
            modal
            trigger={
              <button className="botonAgregarProducto"> Agregar </button>
            }
          >
            <FormProducto id={-1} />
          </Popup>
        </div>
        <table id="productos">
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
        </table>
      </div>
    );
  }
}
export default TablaProductos;
