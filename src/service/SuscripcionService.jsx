import React from 'react';
import axios from 'axios';

class SuscripcionService extends React.Component {

    obtenerSuscripciones() {
        return axios.get("http://localhost:8080/api/v1/suscripcion/");
    }

    borrarSuscripcion(id) {
        axios.delete("http://localhost:8080/api/v1/suscripcion/" + id);
    }

    agregarSuscripcion(cantidadMensual,anual,productoId,clienteId,finSuscripcion) {
        return axios.post('http://localhost:8080/api/v1/suscripcion/', {
            productoId,
            cantidadMensual,
            finSuscripcion,
            clienteId,
            anual,
        })
    }

}

export default new SuscripcionService();