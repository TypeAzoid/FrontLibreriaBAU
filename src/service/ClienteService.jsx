import React from 'react';
import { Component } from 'react';
import axios from 'axios';

class ClienteService extends Component {
    
    async obtenerClientes() {
        let resp = await axios.get("http://localhost:8080/api/v1/cliente/");
        return resp.data;
    }

    obtenerClienteId(id) {
        return axios.get("http://localhost:8080/api/v1/cliente/" + id);
    }

    agregarCliente(nombre,direccion) {
        return axios.post('http://localhost:8080/api/v1/cliente/', {
            name: nombre,
            direccion: direccion,
        })
    }

    borrarCliente(id) {
        return axios.delete('http://localhost:8080/api/v1/cliente/' + id);
    }

    editarCliente(id,nombre,dir) {
        return axios.put('http://localhost:8080/api/v1/cliente/' + id, {
            name: nombre,
            direccion: dir
          });
        }
}

export default new ClienteService();