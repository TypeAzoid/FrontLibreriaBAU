import React from 'react';
import './formsuscripcion.css'
import SuscripcionService from '../../service/SuscripcionService';

class FormEditar extends React.Component {
    constructor() {
        super();
        global.ids = 0;
        global.idc = 0;
        global.idp = 0;
        global.inicio = "";
        global.fin = "";
        global.anual = false;
        global.cantidad = 1;
    }
    display(suscripcion) {
        var elemento = document.getElementById("BSFE");
        var elemento2 = document.getElementById("CSFE");
        elemento.style.display = "block";
        elemento2.style.display = "block";
        global.ids = suscripcion.id;
        global.idc = suscripcion.cliente.id;
        global.idp = suscripcion.producto.id;
        global.inicio = suscripcion.inicio;
        global.fin = suscripcion.fin;
        global.anual = suscripcion.anual;
        global.cantidad = suscripcion.cantidadMensual;
    }
    undisplay() {
        var elemento = document.getElementById("BSFE");
        var elemento2 = document.getElementById("CSFE");
        var elemento3 = document.getElementById("cantidadTI");
        elemento.style.display = "none";
        elemento2.style.display = "none";
        elemento2.style.minHeight = "200px";
        elemento3.style.marginLeft = "15.2%";
        global.ids = 0;
        global.idc = 0;
        global.idp = 0;
        global.inicio = "";
        global.fin = "";
        global.anual = false;
        global.cantidad = 1;
    }

    checkChange = (e) => {
        global.anual = e.target.value;
    }

    cantidadChange = (e) => {
        global.cantidad = e.target.value;
    }

    finChange = (e) => {
        global.fin = e.target.value;
    }

    enviar(cantidad,anual,idp,idc,fin,inicio,ids) {
        SuscripcionService.editarSuscripcion(cantidad,anual,idp,idc,fin,inicio,ids).then( resp => {
            this.undisplay();
        });
    }

    render(){
        return(
            <React.Fragment>
                <div className="backgroundSuscripcionE" id="BSFE"></div>
                <div className="SuscripcionE" id="CSFE">
                    <div className="Selection">Id cliente  seleccionado: {global.idc}</div>
                    <div className="Selection">Id producto seleccionado: {global.idp}</div>
                    <div className="datecontainer">
                        Fin <input type="date" className="Date" value={global.fin} onChange={this.finChange}></input>
                    </div>
                    <button className="botonEnviar" onClick={() => this.enviar(global.cantidad,global.anual,global.idp,global.idc,global.fin,global.inicio,global.ids)}>Enviar</button>
                    <button className="botonCancelar" onClick={() => this.undisplay()}>Cancelar</button>
                    <select className="SelectAnual" value={global.anual} onChange={this.checkChange}>
                        <option value={true}>Anual</option>
                        <option value={false}>No Anual</option>
                    </select>
                    <input type="number" placeholder="cantidad" min="1" value={global.cantidad} onChange={this.cantidadChange} className="cantidad" id="cantidadTI"></input>
                </div>
            </React.Fragment>
        );
    }
}

export default FormEditar;