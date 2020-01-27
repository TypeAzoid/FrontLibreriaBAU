import React from 'react';
import './formsuscripcion.css'
import SuscripcionService from '../../service/SuscripcionService';

class FormEditar extends React.Component {
    constructor() {
        super();
        this.state = {
            fin: "",
            anual: false,
            cantidad: 1,
        }
        this.display = this.display.bind(this);
        this.enviar = this.enviar.bind(this);
        this.undisplay = this.undisplay.bind(this);
        this.cantidadChange = this.cantidadChange.bind(this);
        this.finChange = this.finChange.bind(this);
        this.checkChange = this.checkChange.bind(this);
        this.enviar = this.enviar.bind(this);
    }

    async display(suscripcion) {
        var elemento = document.getElementById("BSFE");
        var elemento2 = document.getElementById("CSFE");
        await this.setState({fin: suscripcion.fin});
        await this.setState({anual: suscripcion.anual});
        await this.setState({cantidad: suscripcion.cantidadMensual});
        elemento.style.display = "block";
        elemento2.style.display = "block";
    }

    async undisplay() {
        var elemento = document.getElementById("BSFE");
        var elemento2 = document.getElementById("CSFE");
        var elemento3 = document.getElementById("cantidadTI");
        elemento.style.display = "none";
        elemento2.style.display = "none";
        elemento2.style.minHeight = "200px";
        elemento3.style.marginLeft = "15.2%";
        await this.setState({fin: ""});
        await this.setState({anual: false});
        await this.setState({cantidad: 1});
    }

    async checkChange(e) {
        await this.setState({anual: e.target.value});
    }

    async cantidadChange(e) {
        await this.setState({cantidad: e.target.value});
    }

    async finChange(e) {
        await this.setState({fin: e.target.value});
    }

    async enviar() {
        /*SuscripcionService.editarSuscripcion(cantidad,anual,idp,idc,fin,inicio,ids).then( resp => {
            this.undisplay();
        });*/
        let cantidad = this.state.cantidad;
        let anual = this.state.anual;
        let fin = this.state.fin;
        this.props.editarSuscripcion(cantidad,anual,fin);
    }

    render(){
        return(
            <React.Fragment>
                <div className="backgroundSuscripcionE" id="BSFE"></div>
                <div className="SuscripcionE" id="CSFE">
                    <div className="datecontainer">
                        Fin <input type="date" className="Date" value={this.state.fin} onChange={this.finChange}></input>
                    </div>
                    <button className="botonEnviar" onClick={() => this.enviar()}>Enviar</button>
                    <button className="botonCancelar" onClick={() => this.undisplay()}>Cancelar</button>
                    <select className="SelectAnual" value={this.state.anual} onChange={this.checkChange}>
                        <option value={true}>Anual</option>
                        <option value={false}>No Anual</option>
                    </select>
                    <input type="number" placeholder="cantidad" min="1" value={this.state.cantidad} onChange={this.cantidadChange} className="cantidad" id="cantidadTI"></input>
                </div>
            </React.Fragment>
        );
    }
}

export default FormEditar;