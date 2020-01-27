import React, { Component } from "react";
import DescuentoService from "../../service/DescuentoService";
import TablaDescuento from "./TablaDescuento"

export default class Descuento extends Component {
  constructor(props) {
    super(props);
    this.getAll = this.getAll.bind(this);
    this.deleteDescuento = this.deleteDescuento.bind(this);
    this.state = {
      descuentos: [],
      decripcion: "",
      valorDescuento: 0
    };
  }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    DescuentoService.findAll().then(response => {
      console.log(response);
      this.setState({ descuentos: response.data });
    });
  }

  deleteDescuento(id) {
    DescuentoService.delete(id).then(response => {
      this.getAll();
    });
  }

  getOne(id) {
    DescuentoService.findOne(id).then(response => {
      this.getAll();
    });
  }

  render() {
    return (
      <div className="tablas">
        <TablaDescuento
          listado = {this.state.descuentos}
          deleteDescuento = {this.deleteDescuento}
          getOne = {this.getOne}
        />
      </div>
    );
  }
}
