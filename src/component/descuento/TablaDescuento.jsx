import React from "react";
import "./tabla.css";
import "./form.css";
import FormDescuento from "./FormDescuento";
import Popup from "reactjs-popup";
import { Button, Table } from "react-bootstrap";

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
            <Button
              variant="danger"
              onClick={() => {
                this.props.deleteDescuento(id);
              }}
            >
              Borrar
            </Button>
            <Popup
              modal
              trigger={<Button variant="secondary"> Editar </Button>}
            >
              <FormDescuento id={id} descripcion={descripcion} />
            </Popup>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="bodyTable">
        <Popup modal trigger={<Button variant="primary"> Agregar </Button>}>
          <FormDescuento id={-1} />
        </Popup>
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
