import React from 'react'
import SuscripcionClienteForm from './suscripcionClienteForm'

class SuscripcionClienteList extends React.Component {

  render() {
    return (
        <table className="contenedor">
            <tr>
                <th className="titulo">nombre</th>
                <th className="titulo">direccion</th>
            </tr>
            {
                this.props.listado.map((cliente) => {
                return <SuscripcionClienteForm id={cliente.id}
                                               name={cliente.name}
                                               direccion={cliente.direccion}
                                               idc={this.props.idc}/>
                })
            }
        </table>
    )
  }
}

export default SuscripcionClienteList