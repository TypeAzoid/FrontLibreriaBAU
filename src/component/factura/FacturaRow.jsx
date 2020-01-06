import React from 'react';

class FacturaRow extends React.Component {

  render() {
    return(
    <tr>
        <td className='Id'>         {this.props.id}</td>
        <td className='Cliente'>    {this.props.cliente.name}</td>
        <td className='Fecha'>      {this.props.fecha}</td>
        <td className='Compras'>    
            <button> Ver </button>
        </td>
        <td className='Descuentos'>
            <button> Ver </button> 
        </td>
        <td className='Monto Total'>{this.props.montoTotal}</td>
        <td className='Pagado'>     {this.props.pagado ? 'Si' : 'No' }</td>
    </tr>
    )
  }
}

export default FacturaRow