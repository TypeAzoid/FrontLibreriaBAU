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
        <tr key={id}>
          <td>{id}</td>
          <td>{nombre}</td>
          <td>{tipo}</td>
          <td>{precio}</td>
          <td>
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
        <h1 id="title">Productos</h1>

        <table id="productos">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Tipo de Producto</th>
              <th>Precio</th>
              <th> Acciones</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
        <Popup modal trigger={<button> Agregar </button>}>
          <FormProducto id={-1} />
        </Popup>
      </div>
    );
  }
}
export default TablaProductos;
