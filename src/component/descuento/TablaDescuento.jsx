import React from "react";

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
        <tr key={id}>
          <td>{id}</td>
          <td>{descripcion}</td>
          <td>{valorDescuento}</td>
          <td>
            <FormDescuento id={id} descripcion={descripcion} />

            <Button
              variant="danger"
              className="button"
              className = "botonesConjuntos"
              onClick={() => {
                this.props.deleteDescuento(id);
              }}
            >
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
        <div className="justified-right" >
          <FormDescuento id={-1} />
        </div>

        <Table variant="dark" id="descuentos" className = "borderTabla">
          <thead>

            <tr>
              <th className = "tablaTopLeftRadius" >Id</th>
              <th>Descripcion del Descuento</th>
              <th>Valor del Descuento</th>
              <th className = "tablaTopRightRadius" > Acciones</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </Table>
      </div>
    );
  }
}
export default TablaDescuentos;
