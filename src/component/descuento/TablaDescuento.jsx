import React from "react";
import "./tabla.css";
import "./form.css";
import FormDescuento from "./FormDescuento";
import Popup from "reactjs-popup";
import { Button, Table } from "react-bootstrap";
import "../globalStyles.css";

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
            <FormDescuento id={id} descripcion={descripcion} />

            <Button
              variant="danger"
              className="button"
              onClick={() => {
                this.props.deleteDescuento(id);
              }}>
              Borrar
            </Button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="bodyTable">
        <div>
          <FormDescuento id={-1} />
        </div>
        
        <Table variant="dark" id="descuentos">
          <thead>
            <tr className="trDescuentos">
              <th className="tdDescuentos">Id</th>
              <th className="tdDescuentos">Descripcion del Descuento</th>
              <th className="tdDescuentos">Valor del Descuento</th>
              <th className="tdDescuentos"> Acciones</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </Table>
      </div>
    );
  }
}
export default TablaDescuentos;
