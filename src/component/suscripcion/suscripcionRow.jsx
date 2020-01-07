import React from 'react';
import SuscripcionService from '../../service/SuscripcionService';
import FormSuscripcion from './FormSuscripcion';
import Suscripcion from './suscripcion';

class SuscripcionRow extends React.Component {

  render() {
    return(
    <tr>
        <td className="columna">{this.props.id}</td>
        <td className="columna">{this.props.producto}</td>
        <td className="columna">{this.props.cantidadMensual}</td>
        <td className="columna">{this.props.inicio}</td>
        <td className="columna">{this.props.fin}</td>
        <td className="columna">{this.props.cliente}</td>
        <td className="columna">{this.props.anual}</td>
        <td className="columna">
          <button className="botonsuscripcion" onClick={() => SuscripcionService.borrarSuscripcion(this.props.id)}>Borrar</button>
          <button className="botonsuscripcion" onClick={() => new Suscripcion().editarSuscripcion(this.props.id)}>Editar</button>
        </td>
    </tr>
    )
  }
}

export default SuscripcionRow;