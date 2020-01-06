import React from 'react';

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
    </tr>
    )
  }
}

export default SuscripcionRow;