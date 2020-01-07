import React from 'react';
import './cuenta.css';

class CuentaC extends React.Component {

    constructor() {
        super();
        this.state = {
            facturas: [],
        }
        global.nombre = "";
        global.id = "";
    }

    display(nombre,id) {
        var elemento = document.getElementById("BD1");
        elemento.style.display = "block";
        elemento = document.getElementById("BD2");
        elemento.style.display = "block";
        global.nombre = nombre;
        global.id = id;
    }

    undisplay() {
        var elemento = document.getElementById("BD1");
        elemento.style.display = "none";
        elemento = document.getElementById("BD2");
        elemento.style.display = "none";
    }

    render() {
        return(
            <React.Fragment>
                <div className="backDetalle" id="BD1"></div>
                <div className="divDetalles" id="BD2">
                    <h3>Facturas: {global.nombre}</h3>
                    <button onClick={() => this.undisplay()}>Cerrar</button>
                </div>
            </React.Fragment>
        );
    }
}

export default CuentaC;