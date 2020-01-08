import React from 'react';
import SuscripcionRow from './suscripcionRow';

class SuscripcionList extends React.Component {

    detectarAnual(value){
        if(value === true) {
            return "Si";
        } else if (value === false) {
            return "No";
        }
    }

    detectarCliente(value) {
        return value.name;
    }

    detectarProducto(value) {
        return value.nombre;
    }
    
    render() {
        return(
            <table className="contenedor">
                <tr className="trSuscripcion">
                    <th className="titulo">Id</th>
                    <th className="titulo">Producto</th>
                    <th className="titulo">Cantidad Mensual</th>
                    <th className="titulo">Comienzo</th>
                    <th className="titulo">Fin</th>
                    <th className="titulo">Cliente</th>
                    <th className="titulo">Anual</th>
                    <th className="titulo"></th>
                </tr>
                {
                    this.props.listado.map((suscripcion) => {
                        return <SuscripcionRow id={suscripcion.id}
                                               cantidadMensual={suscripcion.cantidadMensual}
                                               inicio={suscripcion.inicio}
                                               fin={suscripcion.fin}
                                               anual={this.detectarAnual(suscripcion.anual)}
                                               cliente={this.detectarCliente(suscripcion.cliente)}
                                               producto={this.detectarProducto(suscripcion.producto)}
                                               ids={this.props.ids}/>
                    })
                }
            </table>
        );
    }
}

export default SuscripcionList;