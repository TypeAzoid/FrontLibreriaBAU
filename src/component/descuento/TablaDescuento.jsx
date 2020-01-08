import React from "react";
import "./tabla.css";
import "./form.css";
import FormDescuento from "./FormDescuento";
import Popup from "reactjs-popup";

class TablaDescuentos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderTableData() {
    var props = this.props;
    return props.listado.map(descuento => {
      const { id, descripcion, valorDescuento } = descuento; //destructuring
      return (
        <tr className="trDescuentos" key={id}>
          <td className="tdDescuentos">{id}</td>
          <td className="tdDescuentos">{descripcion}</td>
          <td className="tdDescuentos">{valorDescuento}</td>
          <td className="tdDescuentos">
            <button variant="danger" onClick={() => {this.props.deleteDescuento(id)}}>Borrar</button>
            <Popup modal trigger={<button> Editar </button>}>
              <FormDescuento id={id} descripcion = {descripcion}/>
            </Popup>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="bodyTable">
        <Popup modal trigger={<button> Agregar </button>}>
          <FormDescuento id={-1} />
        </Popup>
        <table id="descuentos">
          <thead>
            <tr className="trDescuentos">
              <th className="tdDescuentos">Id</th>
              <th className="tdDescuentos">Descripcion del Descuento</th>
              <th className="tdDescuentos">Valor del Descuento</th>
              <th className="tdDescuentos"> Acciones</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}
export default TablaDescuentos;
