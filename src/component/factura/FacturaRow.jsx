import React from 'react';
import Popup from 'reactjs-popup'
import FacturaVerDetallesPopup from './FacturaVerDetallesPopup';

class FacturaRow extends React.Component {

  render() {
    return(
    <tr>
        <td className='Id'>         {this.props.id}</td>
        <td className='Cliente'>    {this.props.cliente}</td>
        <td className='ClienteId'>  {this.props.clienteId}</td>
        <td className='Fecha'>      {this.props.fecha}</td>
        <td className='Compras'>   
            <Popup modal trigger={ <button> Ver </button> }>
                <FacturaVerDetallesPopup 
                    title='Compras'
                    compras={this.props.compras}
                />
            </Popup>
        </td>
        <td className='Descuentos'>
            <Popup modal trigger={ <button> Ver </button> }>
                <FacturaVerDetallesPopup 
                    title='Descuentos'
                    descuentos={this.props.descuentos}
                />
            </Popup>  
        </td>
        <td className='Monto Total'>{this.props.montoTotal}</td>
        <td className='Pagado'>     {this.props.pagado ? 'Si' : 'No' }</td>
    </tr>
    )
  }
}

export default FacturaRow