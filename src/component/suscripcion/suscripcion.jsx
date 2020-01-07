import React from 'react';
import SuscripcionList from './suscripcionList';
import SuscripcionService from '../../service/SuscripcionService';
import FormSuscripcion from './FormSuscripcion';
import FormEditar from './formEditar';
import './suscripcion.css';

class Suscripcion extends React.Component {
    constructor() {
        super();
        this.state = {
            suscripciones: [],
            suscripcion: [],
        }
    }

    editarSuscripcion(id) {
        SuscripcionService.obtenerSuscripcionId(id).then(resp => {
            new FormEditar().display(resp.data);
        });
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
                <FormEditar/>
                <FormSuscripcion/>
                <div className="container">
                    <input type="text" className="buscadorname" placeholder="Buscar por nombre de cliente" value={this.state.buscador} onChange={this.busChange}></input>
                    <button className="botonadd" onClick={() => new FormSuscripcion().display(0)}>Agregar</button>
                    <SuscripcionList listado={this.state.suscripciones}
                                     ids={this.state.ids}/>
                </div>
            </React.Fragment>
        );
    }
}

export default Suscripcion;