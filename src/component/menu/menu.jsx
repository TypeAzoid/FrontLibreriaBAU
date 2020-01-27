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
      tab: "24"
    };
  }

  setTab = selectedKey => {
    console.log("el parametro es " + selectedKey);
    this.setState({ tab: selectedKey });
    console.log(this.state.tab);
  };

  render() {
    return (
      <React.Fragment>
        {this.state.tab}
        <Nav
          fill
          activeKey={this.state.tab}
          variant="tabs"
          id="menu"
          onSelect={this.setTab}
        >
          <Nav.Item href="/home">
            <img
              className="logo"
              src="..\..\resources\logo 2.jpg"
              alt="logo"
              height="33"
              width="120"
            />
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              style={{ color: "white" }}
              className="navLinks"
              href="/home"
              eventKey="0"
            >
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              style={{ color: "white" }}
              className="navLinks"
              href="/clientes"
              key="1"
            >
              Clientes
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              style={{ color: "white" }}
              className="navLinks"
              href="/producto"
              eventKey="2"
            >
              Producto
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              style={{ color: "white" }}
              className="navLinks"
              href="/suscripciones"
              eventKey="3"
            >
              Suscripciones
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              style={{ color: "white" }}
              className="navLinks"
              href="/facturas"
              eventKey="4"
            >
              Facturas
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              style={{ color: "white" }}
              className="navLinks"
              href="/descuentos"
              eventKey="5"
            >
              Descuentos
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </React.Fragment>
    );
  }
}

export default Menu;
