import React from 'react'
import ClienteRow from './ClienteRow'

class ClienteList extends React.Component {

  render() {
    return (
        <table className="contenedor">
            <tr>
                <th className="titulo" >id</th>
                <th className="titulo">nombre</th>
                <th className="titulo">direccion</th>
                <th className="titulo">Monto</th>
                <th className="titulo"></th>
            </tr>
            {
                this.props.listado.map((cliente) => {
                return <ClienteRow id={ cliente.id }
                                    name={ cliente.name }
                                    direccion={ cliente.direccion }/>
                })
            }
        </table>
    )
  }
}

export default ClienteList