import React from 'react'

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
                return(
                  <tr className="clienteFila" onClick={() => this.props.idp(producto.id)}>
                    <td className="columna">{producto.nombre}</td>
                    <td className="columna">{producto.precio}</td>
                  </tr>
                );})
            }
        </table>
    )
  }
}

export default SuscripcionProductoList;