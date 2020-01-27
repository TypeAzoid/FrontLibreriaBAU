import React from "react";
import "./menu.css";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";

class Menu extends React.Component {
  constructor() {
    super();
    this.setTab = this.setTab.bind(this);
    this.state = {
      loged: 0,
      tab: "0"
    };
  }

  setTab(e) {
    console.log("el parametro es " + e);
    this.setState({ tab: e });
    console.log(this.state.tab);
  }

  render() {
    return (
      <React.Fragment>
        <Nav
          activeKey="/clientes"
          fill
          variant="tabs"
          id="menu"
          onClick={k => {
            return this.setTab(k.value);
          }}
        >
          <Nav.Item href="/home" value="0">
            <img
              className="logo"
              src="..\..\resources\logo 2.jpg"
              alt="logo"
              height="33"
              width="120"
            />
          </Nav.Item>
          <Nav.Item value="0">
            <Nav.Link
              style={{ color: "white" }}
              className="navLinks"
              href="/home"
            >
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link style={{ color: "white" }} className="navLinks" value="1">
              Clientes
            </Nav.Link>
          </Nav.Item>
          <Nav.Item value="2">
            <Nav.Link
              style={{ color: "white" }}
              className="navLinks"
              href="/producto"
            >
              Producto
            </Nav.Link>
          </Nav.Item>
          <Nav.Item value="3">
            <Nav.Link
              style={{ color: "white" }}
              className="navLinks"
              href="/suscripciones"
            >
              Suscripciones
            </Nav.Link>
          </Nav.Item>
          <Nav.Item value="4">
            <Nav.Link
              style={{ color: "white" }}
              className="navLinks"
              href="/facturas"
            >
              Facturas
            </Nav.Link>
          </Nav.Item>
          <Nav.Item value="5">
            <Nav.Link
              style={{ color: "white" }}
              className="navLinks"
              href="/descuentos"
            >
              descuentos
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </React.Fragment>
    );
  }
}

export default Menu;
