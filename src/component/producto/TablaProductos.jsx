import React from "react";
import "./tabla.css";
import "./form.css";
import FormProducto from "./FormProducto";
import Popup from "reactjs-popup";

class TablaProductos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderTableData() {
    var props = this.props;
    return props.listado.map(producto => {
      const { id, nombre, tipo, precio } = producto; //destructuring
      return (
        <tr className="trProductos" key={id}>
          <td className="tdProductos">{id}</td>
          <td className="tdProductos">{nombre}</td>
          <td className="tdProductos">{tipo}</td>
          <td className="tdProductos">{precio}</td>
          <td className="tdProductos">
            <button variant="danger" onClick={() => {this.props.deleteProducto(id);}}>Borrar</button>
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
        <Popup modal trigger={<button> Agregar </button>}>
          <FormProducto id={-1} />
        </Popup>
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
