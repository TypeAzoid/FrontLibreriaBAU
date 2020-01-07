import React from 'react';
import Popup from 'reactjs-popup'
import FacturaVerDetallesPopup from './FacturaVerDetallesPopup';
import FacturaService from '../../service/FacturaService';

class FacturaRow extends React.Component {

  constructor(props){
      super(props);
      
      this.state = {
        pagado : false
      }

      this.pagarFactura = this.pagarFactura.bind(this);
  }  

  componentWillMount(){
      this.setState({
          pagado : this.props.pagado
      })
  }

  pagarFactura(){
    FacturaService.pagarFactura(this.props.id).then( resp => {
        let factura = resp.data;
        this.setState({
            pagado : factura.pagado
        })
    });
  }

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
        <td className='Pagado'>     
            {this.state.pagado ? 'Pagado' : 
                <button onClick={this.pagarFactura}>
                    Pagar</button> }</td>
    </tr>
    )
  }
}

export default FacturaRow