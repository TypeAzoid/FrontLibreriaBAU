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
      console.log(ClienteService.editarCliente(id,nombre,dir));
    }

    borrarCliente(id) {
      console.log(ClienteService.borrarCliente(id));
    }

    listarClientes() {
      ClienteService.obtenerClientes()
      .then(resp => {
        this.setState({clientes: resp.data})
      });
    }

    agregarCliente(nombre,direccion){
      ClienteService.agregarCliente(nombre,direccion);
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