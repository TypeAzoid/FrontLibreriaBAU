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
            buscador: "",
        };
    };


    editarCliente(id,nombre,dir) {
      console.log(ClienteService.editarCliente(id,nombre,dir));
    }

    borrarCliente(id) {
      console.log(ClienteService.borrarCliente(id));
    }

    listarClientes(nombre) {
      ClienteService.obtenerClientes()
      .then(resp => {
        if(nombre !== "") {
          const data = resp.data.filter(filt => filt.name.toLowerCase() === nombre.toLowerCase());
          this.setState({clientes: data});
        } else {
          this.setState({clientes: resp.data});
        }
      });
    }

    agregarCliente(nombre,direccion){
      ClienteService.agregarCliente(nombre,direccion);
    }

    componentDidMount() {
      setInterval(() => this.listarClientes(this.state.buscador), 500);
      setInterval(() => this.forceUpdate(), 500);
    }

    busChange = (e) =>{ 
      this.setState({buscador: e.target.value});
    }

    render() {
          return (
            <React.Fragment>
              <FormCliente/>
              <div className="Container">
                <input type="text" className="buscadorname" placeholder="Buscar por nombre" value={this.state.buscador} onChange={this.busChange}></input>
                <button onClick={() => new FormCliente().displayeditar(0,"Nombre","Direccion")} className="botonadd">Agregar</button>
                <ClienteList listado={this.state.clientes} />
              </div>
            </React.Fragment>      
          )
      }
}

export default Clientes;