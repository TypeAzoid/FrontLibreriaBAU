import React from 'react';
import SuscripcionList from './suscripcionList';
import SuscripcionService from '../../service/SuscripcionService';
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
            <div className="container">
                <SuscripcionList listado={this.state.suscripciones}/>
            </div>
        );
    }
}

export default Suscripcion;