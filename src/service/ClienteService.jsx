import React from 'react';
import { Component } from 'react';
import axios from 'axios';

class ClienteService extends Component {
    obtenerClientes() {
        return axios.get("http://localhost:8080/api/v1/cliente");
    }

    agregarCliente(nombre,direccion) {
        fetch('http://localhost:8080/api/v1/cliente', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nombre,
          direccion: direccion,
        })
      })
    }

    borrarCliente(id) {
        fetch('http://localhost:8080/api/v1/cliente/'+ id, {
        method: 'DELETE'
         }).then((resp) => {
            return("removed");
        }).catch(err => {
            return(err);
        });
    }

    editarCliente(id,nombre,dir) {
      console.log(nombre);
      console.log(dir);
      console.log(id);
      if(id !== 0 && nombre !== "" && dir !== "") {
        fetch('http://localhost:8080/api/v1/cliente/' + id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nombre,
          direccion: dir,
        })
      })
        return("editado");
      } else {
        return("valores invalidos");
      }
    }

}

export default new ClienteService();