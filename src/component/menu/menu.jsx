import React from 'react';
import './menu.css';

class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            loged: 0,
        }
    }
    render() {
        return(
            <React.Fragment>
                <ul id="menu" className="menu">
                    <li id="homeB"><a href="/home">Home</a></li>
                    <li id="clientesB"><a href="/clientes">Clientes</a></li>
                    <li id="facturaM"><a href="/facturas">Facturas</a></li>
                </ul>
            </React.Fragment>
        );
    }
}

export default Menu;