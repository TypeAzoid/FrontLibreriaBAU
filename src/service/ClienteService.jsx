import React from 'react';
import { Component } from 'react';
import axios from 'axios';

class ClienteService extends Component {
    
    obtenerClientes() {
        return axios.get("http://localhost:8080/api/v1/cliente/");
    }

    obtenerClienteId(id) {
        return axios.get("http://localhost:8080/api/v1/cliente/" + id);
    }

    agregarCliente(nombre,direccion) {
        axios.post('http://localhost:8080/api/v1/cliente/', {
            name: nombre,
            direccion: direccion,
        })
    }

    borrarCliente(id) {
        axios.delete('http://localhost:8080/api/v1/cliente/' + id).then((err) => {
            return("Usuario eliminado: " + err);
        }).catch((err) => {
            return(err);
        });
    }

    editarCliente(id,nombre,dir) {
      if(id !== 0 && nombre !== "" && dir !== "") {
        axios.post('http://localhost:8080/api/v1/cliente/' + id, {
            name: nombre,
            direccion: dir,
        });
        return("usuario editado");
      } else {
        return("valores invalidos");
      }
    }

}

export default new ClienteService();