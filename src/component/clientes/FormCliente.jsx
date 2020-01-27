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
    };

    nameChange = (e) =>{ 
        this.setState({nombrel: e.target.value});
    }
  
    dirChange = (e) =>{ 
        this.setState({direccionl: e.target.value});
    }

    async undisplayeditar(){
        await this.setState({nombrel: ""});
        await this.setState({direccionl: ""});
        var elemento = document.getElementById("cuadroedit1");
        elemento.style.display = "none";
        elemento = document.getElementById("cuadroedit2");
        elemento.style.display = "none";
    }

    displayeditar(){
        var elemento = document.getElementById("cuadroedit1");
        elemento.style.display = "block";
        elemento = document.getElementById("cuadroedit2");
        elemento.style.display = "block";
    }
    
    render() {
        return(
            <React.Fragment>
            <div className="backgroundeditar" id="cuadroedit1">
            </div>
            <div className="contenedoreditar" id="cuadroedit2">
                    <input type="text" className="editarnombre" placeholder={this.props.clienteNombre} value={this.state.nombrel} onChange={this.nameChange}></input>
                    <input type="text" className="editardireccion" placeholder={this.props.clienteDireccion} value={this.state.direccionl} onChange={this.dirChange}></input>
                    <button className="botonagregar" onClick={() => this.props.concreteEdit(this.state.nombrel,this.state.direccionl)}>Enviar</button>
                    <button className="botoncancelar" onClick={() => this.undisplayeditar()}>Cancelar</button>
            </div>
            </React.Fragment>
        );
    }
}

export default FormCliente;