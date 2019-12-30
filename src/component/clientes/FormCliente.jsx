import React from 'react';
import Component from 'react';
import Clientes from './clientes';

class FormCliente extends React.Component {
    displayeditar(){
        var elemento = document.getElementById("cuadroedit1");
        elemento.style.display = "none";
        elemento = document.getElementById("cuadroedit2");
        elemento.style.display = "none";
    }
    render() {
        return(
            <React.Fragment>
            <div className="backgroundeditar" id="cuadroedit1">
            </div>
            <div className="contenedoreditar" id="cuadroedit2">
                    <input type="text" className="editarnombre" placeholder="Nombre"></input>
                    <input type="text" className="editardireccion" placeholder="Direccion"></input>
                    <button className="botonagregar">Enviar</button>
                    <button className="botoncancelar" onClick={() => this.displayeditar()}>Cancelar</button>
            </div>
            </React.Fragment>
        );
    }
}

export default FormCliente;