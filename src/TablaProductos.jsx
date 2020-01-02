import React from "react";
import { Button } from "react-bootstrap";

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
            <Button
              variant="danger"
              onClick={() => {
                this.props.deleteProducto(id);
              }}
            >
              Borrar
            </Button>

            <Button variant="secondary">Editar</Button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h1 id="title">Productos</h1>

        <table id="students">
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
      </div>
    );
  }
}
export default TablaProductos;
