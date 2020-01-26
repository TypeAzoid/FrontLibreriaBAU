import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";
import Popup from "reactjs-popup";

import "./Facturas.css";
import FacturaList from "./FacturaList";
import FacturaService from "../../service/FacturaService";
import FacturaAgregar from "./FacturaAgregar";
import { Button } from "react-bootstrap";

class Facturas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      facturas: []
    };
  }

  componentDidMount() {
    FacturaService.getAllFacturas().then(resp => {
      this.setState({
        facturas: resp.data
      });
    });
  }

  render() {
    return (
      <div className="facturasDiv">
        <h1>
          Facturas
          <br />
          <div>
             <FacturaAgregar  />
          </div>
          <br />
        </h1>
        <FacturaList facturas={this.state.facturas} />
      </div>
    );
  }
}

export default Facturas;
