import React from 'react';
import axios from 'axios';

class SuscripcionService extends React.Component {

    obtenerSuscripciones() {
        return axios.get("http://localhost:8080/api/v1/suscripcion/");
    }

}

export default new SuscripcionService();