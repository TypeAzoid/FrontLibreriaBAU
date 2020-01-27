import React from "react";
import SuscripcionList from "./suscripcionList";
import SuscripcionService from "../../service/SuscripcionService";
import FormSuscripcion from "./FormSuscripcion";
import FormEditar from "./formEditar";
import "./suscripcion.css";
import { Button } from "react-bootstrap";
import "../globalStyles.css";

class Suscripcion extends React.Component {
  constructor() {
    super();
    this.state = {
      suscripciones: [],
      suscripcion: "",
      buscador: ""
    };
    this.busChange = this.busChange.bind(this);
    this.borrarSuscripcion = this.borrarSuscripcion.bind(this);
    this.listarSuscripciones = this.listarSuscripciones.bind(this);
    this.crearSuscripcion = this.crearSuscripcion.bind(this);
    this.displayEditar = this.displayEditar.bind(this);
    this.editarSuscripcion = this.editarSuscripcion.bind(this);
  }

  async editarSuscripcion(cantidad, anual, fin) {
    let cantidadf = this.state.suscripcion.cantidadMensual;
    let anualf = this.state.suscripcion.anual;
    let idp = this.state.suscripcion.producto.id;
    let idc = this.state.suscripcion.cliente.id;
    let finf = this.state.suscripcion.finSuscripcion;
    let ids = this.state.suscripcion.id;
    if (cantidad !== cantidadf && cantidad !== 0) {
      cantidadf = cantidad;
    }
    if (anual !== anualf) {
      anualf = anual;
    }
    if (fin !== finf) {
      finf = fin;
    }
    await SuscripcionService.editarSuscripcion(
      cantidadf,
      anualf,
      idp,
      idc,
      finf,
      ids
    );
    this.refs.formEditar.undisplay();
    await this.setState({ suscripcion: "" });
    alert("suscripcion editada");
    this.listarSuscripciones();
  }

  async listarSuscripciones() {
    let suscripciones = await SuscripcionService.obtenerSuscripciones();
    if (this.state.buscador !== "") {
      suscripciones = suscripciones.filter(filt =>
        filt.cliente.name
          .toLowerCase()
          .includes(this.state.buscador.toLowerCase())
      );
    }
    await this.setState({ suscripciones: suscripciones });
  }

  async busChange(e) {
    await this.setState({ buscador: e.target.value });
    this.listarSuscripciones();
  }

  async borrarSuscripcion(e) {
    await SuscripcionService.borrarSuscripcion(e);
    alert("Suscripcion Borrada");
    this.listarSuscripciones();
  }

  async crearSuscripcion(cantidad, anual, idp, idc, fin) {
    if (
      cantidad !== "" &&
      anual !== "" &&
      idp !== "" &&
      idc !== "" &&
      fin !== ""
    ) {
      const c1 = parseInt(idp);
      const c2 = parseInt(idc);
      const c3 = parseInt(cantidad);
      SuscripcionService.agregarSuscripcion(c3, anual, c1, c2, fin).then(
        sus => {
          alert("suscripcion creada");
          this.refs.formSuscripcion.undisplay();
          this.listarSuscripciones();
        }
      );
    } else {
      alert("Los campos no pueden estar vacios");
      this.refs.formSuscripcion.undisplay();
      this.listarSuscripciones();
    }
  }

  async displayEditar(e) {
    let suscripcion = await SuscripcionService.obtenerSuscripcionId(e);
    await this.setState({ suscripcion: suscripcion });
    this.refs.formEditar.display(suscripcion);
  }

  componentDidMount() {
    this.listarSuscripciones();
  }

  render() {
    return (
      <React.Fragment>
        <FormEditar
          ref="formEditar"
          suscripcion={this.state.suscripcion}
          editarSuscripcion={this.editarSuscripcion}
        />

        <div className="bodyTable tablas">
          <div className="overheadTable">
            <div className="justified-left">
              <input
                type="text"
                className="input"
                placeholder="Buscar por nombre de cliente"
                value={this.state.buscador}
                onChange={this.busChange}
              ></input>
            </div>

            <div className="justified-right">
              <FormSuscripcion
                ref="formSuscripcion"
                crearSuscripcion={this.crearSuscripcion}
              />
            </div>
          </div>
          <SuscripcionList
            listado={this.state.suscripciones}
            ids={this.state.ids}
            borrarSuscripcion={this.borrarSuscripcion}
            displayEditar={this.displayEditar}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Suscripcion;
