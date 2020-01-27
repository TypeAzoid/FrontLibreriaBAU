import React from "react";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";

class ClienteList extends React.Component {
  render() {
    return (
      <Table variant="dark">
        <thead>
          <th>id</th>
          <th>nombre</th>
          <th>direccion</th>
          <th>Monto</th>
          <th></th>
        </thead>
        {this.props.listado.map(cliente => {
          return (
            <tr>
              <td id={cliente.id}>{cliente.id}</td>
              <td>{cliente.name}</td>
              <td>{cliente.direccion}</td>
              <td>monto</td>
              <td>
                <Button variant="secondary">Detalles</Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    this.props.editarCliente(
                      cliente.id,
                      cliente.name,
                      cliente.direccion
                    )
                  }
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={e => this.props.borrarCliente(e)}
                  value={cliente.id}
                >
                  Borrar
                </Button>
              </td>
            </tr>
          );
        })}
      </Table>
    );
  }
}

export default ClienteList;
