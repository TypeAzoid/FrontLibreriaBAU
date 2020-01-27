import React from "react";
import SuscripcionRow from "./suscripcionRow";
import { Table } from "react-bootstrap";

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
            <SuscripcionRow
              id={suscripcion.id}
              cantidadMensual={suscripcion.cantidadMensual}
              inicio={suscripcion.inicio}
              fin={suscripcion.fin}
              anual={this.detectarAnual(suscripcion.anual)}
              cliente={this.detectarCliente(suscripcion.cliente)}
              producto={this.detectarProducto(suscripcion.producto)}
              ids={this.props.ids}
            />
          );
        })}
      </Table>
    );
  }
}

export default SuscripcionList;
