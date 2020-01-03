import React from 'react';

class SuscripcionRow extends React.Component {

  render() {
    return(
    <tr>
        <td className="columna">{this.props.id}</td>
        <td className="columna">{this.props.Producto}</td>
        <td className="columna">{this.props.Cantidad_mensual}</td>
        <td className="columna">{this.props.Inicio_de_suscripcion}</td>
        <td className="columna">{this.props.Fin_de_suscripcion}</td>
        <td className="columna">{this.props.cliente}</td>
        <td className="columna">-</td>
    </tr>
    )
  }
}

export default SuscripcionRow;