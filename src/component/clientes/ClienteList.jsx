import React from 'react'

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
                    <button className="botoncliente">Detalles</button>
                      <button className="botoncliente" onClick={() => this.props.editarCliente(cliente.id,cliente.name,cliente.direccion)}>Editar</button>
                      <button className="botoncliente" onClick={(e) => this.props.borrarCliente(e)} value={cliente.id}>Borrar</button>
                    </td>
                  </tr>);
                })
            }
        </table>
    )
  }
}

export default ClienteList