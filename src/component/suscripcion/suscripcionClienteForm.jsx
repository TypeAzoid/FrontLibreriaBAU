import React from 'react';
import FormSuscripcion from './FormSuscripcion';

class SuscripcionClienteForm extends React.Component {
  render() {
    return(
    <tr className="clienteFila" onClick={() => this.props.idc(this.props.id)}>
        <td className="columna">{this.props.name}</td>
        <td className="columna">{this.props.direccion}</td>
    </tr>
    )
  }
}

export default SuscripcionClienteForm