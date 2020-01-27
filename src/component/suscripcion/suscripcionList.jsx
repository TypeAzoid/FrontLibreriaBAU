import React from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import SuscripcionService from "../../service/SuscripcionService";
import Suscripcion from "./suscripcion";

class SuscripcionList extends React.Component {
  detectarAnual(value) {
    if (value === true) {
      return "Si";
    } else if (value === false) {
      return "No";
    }
  }

  detectarCliente(value) {
    return value.name;
  }

  detectarProducto(value) {
    return value.nombre;
  }

  render() {
    return (
      <Table variant="dark" size="sm">
        <thead>
          <th>Id</th>
          <th>Producto</th>
          <th>Cantidad Mensual</th>
          <th>Comienzo</th>
          <th>Fin</th>
          <th>Cliente</th>
          <th>Anual</th>
          <th></th>
        </thead>
        {this.props.listado.map(suscripcion => {
          return (
            <tr>
              <td>{suscripcion.id}</td>
              <td>{suscripcion.producto.nombre}</td>
              <td>{suscripcion.cantidadMensual}</td>
              <td>{suscripcion.inicio}</td>
              <td>{suscripcion.fin}</td>
              <td>{suscripcion.cliente.name}</td>
              <td>{suscripcion.anual}</td>
              <td>
                  <Button
                    variant="danger"
                    className="button"
                    onClick={() => this.props.borrarSuscripcion(suscripcion.id)}
                  >
                    Borrar
                  </Button>
                  <Button
                    variant="secondary"
                    className="button"
                    onClick={() => this.props.displayEditar(suscripcion.id)}
                  >
                    Editar
                  </Button>
              </td>
            </tr>
          );
        })}
      </Table>
    );
  }
}

export default SuscripcionList;
