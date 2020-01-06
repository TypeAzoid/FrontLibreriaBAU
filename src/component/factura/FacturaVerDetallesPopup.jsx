import React, { Component } from 'react'


export default class FacturaVerDetallesPopup extends Component {
    constructor(props){
        super(props);

        this.comprasTableHead = this.comprasTableHead.bind(this);
        this.descuentosTableHead = this.descuentosTableHead.bind(this);
        this.comprasTableBody = this.comprasTableBody.bind(this);
        this.descuentosTableBody = this.descuentosTableBody.bind(this);
    }

    comprasTableHead(){
        return(
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
          )
    }

    comprasTableBody(){
        return(
            this.props.compras.map( compra => {
                    return(
                        <tr>
                            <th>{compra.producto.nombre}</th>
                            <th>{compra.producto.precio}</th>
                            <th>{compra.cantidad}</th>
                            <th>{compra.producto.precio * compra.cantidad}</th>
                        </tr>
                    )
                })
        )
    }

    descuentosTableHead(){
        return(
            <tr>
              <th>Id</th>
              <th>Descripcion</th>
              <th>Descuento</th>
            </tr>
            )
    }

    descuentosTableBody(){
        return(
                this.props.descuentos.map( descuento => {
                    return(
                        <tr>
                            <th>{descuento.id}</th>
                            <th>{descuento.descripcion}</th>
                            <th>{descuento.valorDescuento}</th>
                        </tr>
                    )
                })
        )
    }

    render() {
        return (
            <div>
                {this.props.title}
                <table className='facturaTavle'>
                  <thead>
                    { this.props.title == 'Compras' ? this.comprasTableHead() : this.descuentosTableHead()}
                  </thead>
                  <tbody>
                    { this.props.title == 'Compras' ? this.comprasTableBody() : this.descuentosTableBody()}
                  </tbody>
        </table>
            </div>
        )
    }
}
