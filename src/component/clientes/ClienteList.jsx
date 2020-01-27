import React from 'react'
import { Button } from "react-bootstrap";

class ClienteList extends React.Component {

  render() {
    return (
        <table className="contenedor">
            <tr className="trCliente">
                <th className="titulo" >id</th>
                <th className="titulo">nombre</th>
                <th className="titulo">direccion</th>
                <th className="titulo">Monto</th>
                <th className="titulo"></th>
            </tr>
            {
                this.props.listado.map((cliente) => {
                  return(
                  <tr>
                    <td className="columna" id={cliente.id}>{cliente.id}</td>
                    <td className="columna">{cliente.name}</td>
                    <td className="columna">{cliente.direccion}</td>
                    <td className="columna">monto</td>
                    <td className="botonera">
                    <Button variant="secondary" className="botoncliente">Detalles</Button>
                      <Button variant="secondary" className="botoncliente" onClick={() => this.props.editarCliente(cliente.id,cliente.name,cliente.direccion)}>Editar</Button>
                      <Button variant="danger" className="botoncliente" onClick={(e) => this.props.borrarCliente(e)} value={cliente.id}>Borrar</Button>
                    </td>
                  </tr>);
                })
            }
        </table>
    )
  }
}

export default ClienteList