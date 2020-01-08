import React from "react";
import ReactDOM from "react-dom";
import ProductoService from "../../service/ProductoService";

class FormProducto extends React.Component {
  constructor(props) {
    super(props);
    this.getTipos = this.getTipos.bind(this);
    this.tipoOnChange = this.tipoOnChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.precioChange = this.precioChange.bind(this);

    this.state = {
      tipos: [],
      nombre: "",
      tipoDeProducto: 1,
      precio: 0,
      id: this.props.id,
      titulo: ""
    };
  }

  isAgregar() {
    var newTitulo = this.state.id >= 0 ? "Editar" : "Agregar";
    this.setState({ titulo: newTitulo });
  }

  formAction() {
    if (this.state.titulo === "Agregar") {
      return this.agregar();
    } else {
      return this.editar();
    }
  }

  agregar() {
    var nombre = this.state.nombre;
    var tipo = this.state.tipoDeProducto;
    var precio = this.state.precio;

    console.log("el nombre es:" + nombre);
    console.log("el tipo es:" + tipo);
    console.log("el precio es:" + precio);
    ProductoService.agregarProducto(nombre, tipo, precio).then(response => {
      window.open("http://localhost:3000/producto", "_self");
    });
  }

  editar() {
    var nombre = this.state.nombre;
    var tipo = this.state.tipoDeProducto;
    var precio = this.state.precio;
    var id = this.state.id;

    console.log("el nombre es:" + nombre);
    console.log("el tipo es:" + tipo);
    console.log("el precio es:" + precio);
    console.log("el id es:" + id);

    ProductoService.editarProducto(id, nombre, tipo, precio).then(() => {
      window.open("http://localhost:3000/producto", "_self");
    });
  }

  getTipos() {
    ProductoService.getTipos().then(response => {
      console.log(response.data);
      this.setState({ tipos: response.data });
    });
  }

  tipoOnChange(e) {
    var tipoProducto =
      this.state.tipos.findIndex(tipo => {
        return tipo === e.target.value;
      }) + 1;
    this.setState({ tipoDeProducto: tipoProducto });
  }

  nameChange(e) {
    this.setState({ nombre: e.target.value });
  }

  precioChange(e) {
    this.setState({ precio: e.target.value });
  }

  componentWillMount() {
    this.isAgregar();
    this.getTipos();
  }

  render() {
    let i = 0;
    var tipos = this.state.tipos.map(tipos => {
      return <option key={i++}>{tipos}</option>;
    });

    return (
      <div className="popup">
        <h1>{this.state.titulo}</h1>
        <input type="text" value={this.state.nombre} onChange={this.nameChange}></input>
        <select className="tipo" onChange={this.tipoOnChange}>{tipos}</select>
        <input type="text" value={this.state.precio} onChange={this.precioChange}></input>
        <button onClick={() => {this.formAction();}}>{this.state.titulo}</button>
        <a href="/producto">
          <button>Cancelar</button>
        </a>
      </div>
    );
  }
}

export default FormProducto;
