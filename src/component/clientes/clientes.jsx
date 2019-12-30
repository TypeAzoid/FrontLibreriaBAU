import React from 'react';
import { Component } from 'react';
import ClienteList from './ClienteList';
import ReactDOM from 'react-dom';
import ClienteService from '../../service/ClienteService';
import FormCliente from './FormCliente';

import './cliente.css'
import './form.css'

class Clientes extends Component {
  constructor () {
        super();
        this.state = {
            clientes: [],
        };
    };


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
      console.log("editado");
      } else {
        console.log("Valores invalidos");
      }
    }

    borrarCliente(id) {
      fetch('http://localhost:8080/api/v1/cliente/'+ id, {
        method: 'DELETE'
      }).then((resp) => {
        console.log('removed');
      }).catch(err => {
        console.error(err)
      });
    }

    listarClientes() {
      ClienteService.obtenerClientes()
      .then(resp => {
        this.setState({clientes: resp.data})
      })
    }

    agregarCliente(nombre,direccion){
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

    componentDidMount() {
      setInterval(() => this.listarClientes(), 500);
      setInterval(() => this.forceUpdate(), 500);
    }

    render() {
        if (this.state.clientes.length > 0) {
          return (
            <React.Fragment>
              <FormCliente/>
              <div className="Container">
                <button onClick={() => new FormCliente().displayeditar(0,"Nombre","Direccion")} className="botonadd">Agregar</button>
                <ClienteList listado={this.state.clientes} />
              </div>
            </React.Fragment>      
          )
        } else {
          return <p className="text-center">Cargando Clientes...</p>
        }
      }
}

export default Clientes;