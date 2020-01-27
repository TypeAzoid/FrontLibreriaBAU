import React from "react";
import Popup from "reactjs-popup";
import FacturaVerDetallesPopup from "./FacturaVerDetallesPopup";
import FacturaService from "../../service/FacturaService";
import { Button, Table } from "react-bootstrap";

class FacturaRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pagado: false
    };

    this.pagarFactura = this.pagarFactura.bind(this);
  }

  componentWillMount() {
    this.setState({
      pagado: this.props.pagado
    });
  }

  pagarFactura() {
    FacturaService.pagarFactura(this.props.id).then(resp => {
      let factura = resp.data;
      this.setState({
        pagado: factura.pagado
      });
    });
  }

  render() {
    return (
      <tr>
        <td className="Id"> {this.props.id}</td>
        <td className="Cliente"> {this.props.cliente}</td>
        <td className="ClienteId"> {this.props.clienteId}</td>
        <td className="Fecha"> {this.props.fecha}</td>
        <td className="Compras">
            <FacturaVerDetallesPopup
              title="Compras"
              compras={this.props.compras}
            />
        </td>
        <td className="Descuentos">
            <FacturaVerDetallesPopup
              title="Descuentos"
              descuentos={this.props.descuentos}
            />
        </td>
        <td className="Monto Total">{this.props.montoTotal.toFixed(2)}</td>
        <td className="Pagado">
          {this.state.pagado ? (
            "Pagado"
          ) : (
            <Button variant="success" onClick={this.pagarFactura}>
              Pagar
            </Button>
          )}
        </td>
      </tr>
    );
  }
}

export default FacturaRow;
