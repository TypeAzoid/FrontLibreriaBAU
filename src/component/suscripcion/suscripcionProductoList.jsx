import React from 'react'
import SuscripcionProductoForm from './suscripcionProductoForm'

class SuscripcionProductoList extends React.Component {

  render() {
    return (
        <table className="contenedor">
            <tr>
                <th className="titulo">nombre</th>
                <th className="titulo">precio</th>
            </tr>
            {
                this.props.listado.map((producto) => {
                return <SuscripcionProductoForm id={producto.id}
                                               name={producto.nombre}
                                               precio={producto.precio}
                                               idp={this.props.idp}/>
                })
            }
        </table>
    )
  }
}

export default SuscripcionProductoList;