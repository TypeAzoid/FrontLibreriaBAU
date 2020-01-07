import React from 'react';
import FormSuscripcion from './FormSuscripcion';

class SuscripcionProductoForm extends React.Component {

  render() {
    return(
    <tr className="clienteFila" onClick={() => this.props.idp(this.props.id)}>
        <td className="columna">{this.props.name}</td>
        <td className="columna">{this.props.precio}</td>
    </tr>
    )
  }
}

export default SuscripcionProductoForm;