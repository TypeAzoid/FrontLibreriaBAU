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
            busqueda: "0",
        };
    };

    busChange = (e) =>{ 
      this.setState({buscador: e.target.value});
    }

    changeBusq = (e) =>{ 
      this.setState({busqueda: e.target.value});
    }

    editarCliente(id,nombre,dir) {
      console.log(ClienteService.editarCliente(id,nombre,dir));
    }

    borrarCliente(id) {
      console.log(ClienteService.borrarCliente(id));
    }

    listarClientes(nombre,busqueda) {
      ClienteService.obtenerClientes()
      .then(resp => {
        if(nombre !== "") {
          if(busqueda === "0") {
            const data = resp.data.filter(filt => filt.name.toLowerCase() === nombre.toLowerCase());
            this.setState({clientes: data});
          } else if(busqueda === "1") {
            const data = resp.data.filter(filt => filt.direccion.toLowerCase() === nombre.toLowerCase());
            this.setState({clientes: data});
          } else if (busqueda === "2") {
            const data = resp.data.filter(filt => filt.id === parseInt(nombre));
            this.setState({clientes: data});
          }
        } else {
          this.setState({clientes: resp.data});
        }
      });
    }

    agregarCliente(nombre,direccion){
      ClienteService.agregarCliente(nombre,direccion);
    }

    componentDidMount() {
      setInterval(() => this.listarClientes(this.state.buscador,this.state.busqueda), 500);
      setInterval(() => this.forceUpdate(), 500);
    }

    render() {
          return (
            <React.Fragment>
              <FormCliente/>
              <div className="Container">
                <select value={this.state.busqueda} onChange={this.changeBusq}>
                  <option value="0">Nombre</option>
                  <option value="1">Direccion</option>
                  <option value="2">Id</option>
                </select>
                <input type="text" className="buscadorname" placeholder="<== buscar por" value={this.state.buscador} onChange={this.busChange}></input>
                <button onClick={() => new FormCliente().displayeditar(0,"Nombre","Direccion")} className="botonadd">Agregar</button>
                <ClienteList listado={this.state.clientes} />
              </div>
            </React.Fragment>      
          )
      }
}

export default Clientes;