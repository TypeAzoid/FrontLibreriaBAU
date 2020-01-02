import React from 'react';
import Component from 'react';
import Clientes from './clientes';

class FormCliente extends React.Component {
    constructor () {
        super();
        this.state = {
            nombrel: "",
            direccionl: "",
        };
        global.id = 0;
        global.name = "Nombre";
        global.direccion = "Direccion";
    };

    nameChange = (e) =>{ 
        this.setState({nombrel: e.target.value});
    }
  
    dirChange = (e) =>{ 
        this.setState({direccionl: e.target.value});
    }

    undisplayeditar(){
        var elemento = document.getElementById("cuadroedit1");
        elemento.style.display = "none";
        elemento = document.getElementById("cuadroedit2");
        elemento.style.display = "none";
        this.setState({nombrel: ""});
        this.setState({direccionl: ""});
        global.id = 0;
        global.name = 0;
        global.direccion = 0;
    }

    displayeditar(id,nombre,direccion){
        var elemento = document.getElementById("cuadroedit1");
        elemento.style.display = "block";
        elemento = document.getElementById("cuadroedit2");
        elemento.style.display = "block";
        global.id = id;
        global.name = nombre;
        global.direccion = direccion;
    }

    enviar(id,nombre,direccion) {
        if(id === 0) {
            new Clientes().agregarCliente(nombre,direccion);
            this.setState({nombrel: ""});
            this.setState({direccionl: ""});
            this.undisplayeditar();
        } else {
            new Clientes().editarCliente(id,nombre,direccion);
            this.setState({nombrel: ""});
            this.setState({direccionl: ""});
            this.undisplayeditar();
        }
    }

    render() {
        return(
            <React.Fragment>
            <div className="backgroundeditar" id="cuadroedit1">
            </div>
            <div className="contenedoreditar" id="cuadroedit2">
                    <input type="text" className="editarnombre" placeholder={global.name} value={this.state.nombrel} onChange={this.nameChange}></input>
                    <input type="text" className="editardireccion" placeholder={global.direccion} value={this.state.direccionl} onChange={this.dirChange}></input>
                    <button className="botonagregar" onClick={() => this.enviar(global.id,this.state.nombrel,this.state.direccionl)}>Enviar</button>
                    <button className="botoncancelar" onClick={() => this.undisplayeditar()}>Cancelar</button>
            </div>
            </React.Fragment>
        );
    }
}

export default FormCliente;