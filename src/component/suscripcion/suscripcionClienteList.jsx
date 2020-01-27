import React from 'react'

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
                return(
                  <tr className="clienteFila" onClick={() => this.props.idc(cliente.id)}>
                    <td className="columna">{cliente.name}</td>
                    <td className="columna">{cliente.direccion}</td>
                  </tr>
                );})
            }
        </table>
    )
  }
}

export default SuscripcionClienteList