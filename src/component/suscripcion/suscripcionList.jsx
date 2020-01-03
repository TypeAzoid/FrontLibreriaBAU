import React from 'react';
import SuscripcionRow from './suscripcionRow';

class SuscripcionList extends React.Component {
    render() {
        return(
            <table className="contenedor">
                <tr>
                    <th className="titulo">Id</th>
                    <th className="titulo">Producto</th>
                    <th className="titulo">Cantidad Mensual</th>
                    <th className="titulo">Comienzo</th>
                    <th className="titulo">Fin</th>
                    <th className="titulo">Cliente</th>
                    <th className="titulo">Anual</th>
                </tr>
                {
                    this.props.listado.map((suscripcion) => {
                        return <SuscripcionRow id={ suscripcion.id }
                                               Producto={ suscripcion.Producto }
                                               Cantidad_mensual={ suscripcion.Cantidad_mensual}
                                               Inicio_de_suscripcion={ suscripcion.Inicio_de_suscripcion }
                                               Fin_de_suscripcion={ suscripcion.Fin_de_suscripcion }
                                               cliente={ suscripcion.cliente }/>
                    })
                }
            </table>
        );
    }
}
/*      <td className="columna">{this.props.id}</td>
        <td className="columna">{this.props.Producto.nombre}</td>
        <td className="columna">{this.props.Cantidad_mensual}</td>
        <td className="columna">{this.props.Inicio_de_suscripcion}</td>
        <td className="columna">{this.props.Fin_de_suscripcion}</td>
        <td className="columna">{this.props.cliente.name}</td>*/
export default SuscripcionList;