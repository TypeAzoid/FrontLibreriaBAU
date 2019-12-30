import React from 'react';
import { Component } from 'react';
import axios from 'axios';

class ClienteService extends Component {
    obtenerClientes() {
        return axios.get("http://localhost:8080/api/v1/cliente");
    }
}

export default new ClienteService();