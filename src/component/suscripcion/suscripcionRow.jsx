import React from "react";
import SuscripcionService from "../../service/SuscripcionService";
import FormSuscripcion from "./FormSuscripcion";
import Suscripcion from "./suscripcion";
import { Button } from "react-bootstrap";

class SuscripcionRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.producto}</td>
        <td>{this.props.cantidadMensual}</td>
        <td>{this.props.inicio}</td>
        <td>{this.props.fin}</td>
        <td>{this.props.cliente}</td>
        <td>{this.props.anual}</td>
        <td>
          <Button
            variant="danger"
            className="button"
            onClick={() => SuscripcionService.borrarSuscripcion(this.props.id)}
          >
            Borrar
          </Button>
          <Button
            variant="secondary"
            className="button"
            onClick={() => new Suscripcion().editarSuscripcion(this.props.id)}
          >
            Editar
          </Button>
        </td>
      </tr>
    );
  }
}

export default SuscripcionRow;
