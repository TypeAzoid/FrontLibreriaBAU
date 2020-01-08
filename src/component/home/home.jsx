import React, { Component } from "react";
import './home.css';

export default class Home extends Component {

    specialStyles() {
        var element = document.getElementById("menu");
        element.style.display = "none";
        var element2 = document.getElementsByTagName("body");
        element2.className = "bodyHome"
    }

    componentDidMount() {
        this.specialStyles();
    }

    render() {
        return(
            <React.Fragment>
                    <div id='warped'>
                        <span class='w0'>K</span><span class='w1'>i</span><span class='w2'>o</span><span class='w3'>s</span><span class='w4'>k</span><span class='w5'>o</span><span class='w6'> </span><span class='w7'>y</span><span class='w8'> </span><span class='w9'>L</span><span class='w10'>i</span><span class='w11'>b</span><span class='w12'>e</span><span class='w13'>r</span><span class='w14'>i</span><span class='w15'>a</span><span class='w16'> </span><span class='w17'>B</span><span class='w18'>a</span><span class='w19'>u</span><span class='w20'>f</span><span class='w21'>e</span><span class='w22'>s</span><span class='w23'>t</span>
                    </div>
                    <div className="botoneraHome">
                        <button className="botonHome"><a href="/clientes">Clientes</a></button>
                        <button className="botonHome"><a href="/producto">Productos</a></button>
                        <button className="botonHome"><a href="/suscripciones">Suscripciones</a></button>
                        <button className="botonHome"><a href="/facturas">Facturas</a></button>
                        <button className="botonHome"><a href="/descuentos">Descuentos</a></button>
                    </div>
            </React.Fragment>
        );
    }
}