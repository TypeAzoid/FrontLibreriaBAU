import React from 'react';
import Clientes from './clientes';
import FormCliente from './FormCliente';
import CuentaC from '../cuentas/cuenta';

class ClienteRow extends React.Component {

  render() {
    return(
    <tr>
        <td className="columna" id={this.props.id}>{this.props.id}</td>
        <td className="columna">{this.props.name}</td>
        <td className="columna">{this.props.direccion}</td>
        <td className="columna">monto</td>
        <td className="botonera">
        <button onClick={() => new CuentaC().display(this.props.name,this.props.id)} className="botoncliente">Detalles</button>
          <button onClick={() => new FormCliente().displayeditar(this.props.id,this.props.name,this.props.direccion)} className="botoncliente">Editar</button>
          <button onClick={() => new Clientes().borrarCliente(this.props.id)} className="botoncliente">Borrar</button>
        </td>
    </tr>
    )
  }
}

export default ClienteRow