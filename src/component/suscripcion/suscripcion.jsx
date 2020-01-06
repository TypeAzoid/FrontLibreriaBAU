import React from 'react';
import SuscripcionList from './suscripcionList';
import SuscripcionService from '../../service/SuscripcionService';
import FormSuscripcion from './FormSuscripcion';

import './suscripcion.css';

class Suscripcion extends React.Component {
    constructor() {
        super();
        this.state = {
            suscripciones: [],
        }
    }

    obtenerSuscripciones() {
        SuscripcionService.obtenerSuscripciones()
        .then( resp => {
            this.setState({suscripciones: resp.data});
        });
    }

    componentDidMount() {
        setInterval(() => {
            this.obtenerSuscripciones();
            this.forceUpdate();
        }, 500);
    }
    
    render() {
        return(
            <React.Fragment>
                <FormSuscripcion/>
                <div className="container">
                    <input type="text" className="buscadorname" placeholder="Buscar por nombre de cliente" value={this.state.buscador} onChange={this.busChange}></input>
                    <button className="botonadd" onClick={() => new FormSuscripcion().display()}>Agregar</button>
                    <SuscripcionList listado={this.state.suscripciones}/>
                </div>
            </React.Fragment>
        );
    }
}

export default Suscripcion;