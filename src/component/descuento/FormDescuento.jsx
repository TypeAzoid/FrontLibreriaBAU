import React from "react";
import ReactDOM from "react-dom";
import DescuentoService from "../../service/DescuentoService";

class FormDescuento extends React.Component {
  constructor(props) {
    super(props);
    this.descripcionChange = this.descripcionChange.bind(this);
    this.valorDescuentoChange = this.valorDescuentoChange.bind(this);

    this.state = {
      titulo: "",
      descripcion: "",
      valorDescuento: 0,
      id: this.props.id
    };
  }

  isAgregar() {
    var newDescuento = this.state.id >= 0 ? "Editar" : "Agregar";
    this.setState({ titulo: newDescuento });
  }

  formAction() {
    if (this.state.titulo === "Agregar") {
      return this.agregar();
    } else {
      return this.editar();
    }
  }

  agregar() {
    var descripcion = this.state.descripcion;
    var valorDescuento = this.state.valorDescuento;

    console.log("la descripcion es:" + descripcion);
    console.log("el valor de descuento es:" + valorDescuento);
    DescuentoService.post(descripcion, valorDescuento).then(response => {
      window.open("http://localhost:3000/descuentos", "_self");
    });
  }

  editar() {
    var descripcion = this.state.descripcion;
    var valorDescuento = this.state.valorDescuento;
    var id = this.state.id;

    console.log("la descripcion es:" + descripcion);
    console.log("el valor de descuento es:" + valorDescuento);
    console.log("el id es:" + id);

    DescuentoService.edit(id, descripcion, valorDescuento).then(() => {
      window.open("http://localhost:3000/descuentos", "_self");
    });
  }

  descripcionChange(e) {
    this.setState({ descripcion: e.target.value });
  }

  valorDescuentoChange(e) {
    this.setState({ valorDescuento: e.target.value });
  }

  componentWillMount() {
    this.isAgregar();
  }

  render() {
    let i = 0;

    return (
      <div className="popup">
        <h1>{this.state.titulo}</h1>
        <div>
          <span>Descripcion ---- </span>
          <span>Valor del descuento</span>
        </div>
        <input
          type="text"
          value={this.state.descripcion}
          placeholder = {this.props.descripcion}
          onChange={this.descripcionChange}
        ></input>
        <input
          type="text"
          value={this.state.valorDescuento}
          onChange={this.valorDescuentoChange}
        ></input>
        <button
          onClick={() => {
            this.formAction();
          }}
        >
          {this.state.titulo}
        </button>

        <a href="/descuentos">
          <button>Cancelar</button>
        </a>
      </div>
    );
  }
}

export default FormDescuento;
