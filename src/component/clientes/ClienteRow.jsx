import React from 'react';
import Clientes from './clientes';

class ClienteRow extends React.Component {

  render() {
    return(
    <tr>
        <td className="id" id={this.props.id}>{this.props.id}</td>
        <td className="nombre">{this.props.name}</td>
        <td className="direccion">{this.props.direccion}</td>
        <td className="botonera"><button onClick={() => new Clientes().borrarCliente(this.props.id)} className="botoncliente">Borrar</button><button onClick={() => new Clientes().idChange(this.props.id)} className="botoncliente">Seleccionar</button></td>
    </tr>
    )
  }
}

export default ClienteRow