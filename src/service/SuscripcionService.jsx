import React from 'react';
import axios from 'axios';
import { Component } from 'react';

class SuscripcionService extends Component {

    async obtenerSuscripciones() {
        let resp = await axios.get("http://localhost:8080/api/v1/suscripcion/");
        return resp.data;
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
    
    editarSuscripcion(cantidadMensual,anual,productoId,clienteId,finSuscripcion,ids) {
        return axios.put('http://localhost:8080/api/v1/suscripcion/' + ids, {
            productoId,
            cantidadMensual,
            finSuscripcion,
            clienteId,
            anual,
        })
    }

    async obtenerSuscripcionId(id) {
        let resp = await axios.get("http://localhost:8080/api/v1/suscripcion/" + id);
        return resp.data;
    }

}

export default new SuscripcionService();