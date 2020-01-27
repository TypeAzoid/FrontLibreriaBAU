import React from "react";
import FacturaRow from "./FacturaRow";
import { Button, Table } from "react-bootstrap";

class FacturaList extends React.Component {
  render() {
    return (
      <Table variant="dark" responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Cliente</th>
            <th>Id Cliente</th>
            <th>Fecha</th>
            <th>Compras</th>
            <th>Descuentos</th>
            <th>Monto Total</th>
            <th>Pagado</th>
          </tr>
        </thead>
        <tbody>
          {this.props.facturas.map(f => {
            return (
              <FacturaRow
                key={f.id}
                id={f.id}
                cliente={f.cliente.name}
                clienteId={f.cliente.id}
                fecha={f.fecha}
                compras={f.compras}
                descuentos={f.descuentos}
                montoTotal={f.montoTotal}
                pagado={f.pagado}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default FacturaList;
