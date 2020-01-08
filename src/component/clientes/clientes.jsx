import React from 'react';
import { Component } from 'react';
import ClienteList from './ClienteList';
import ClienteService from '../../service/ClienteService';
import SuscripcionService from '../../service/SuscripcionService';
import FormCliente from './FormCliente';

import './cliente.css'
import './form.css'
import CuentaC from '../cuentas/cuenta';

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

    async borrarCliente(id) {
      const cliente = (await ClienteService.obtenerClienteId(id)).data;
      const suscripciones = (await SuscripcionService.obtenerSuscripciones()).data;
      const incluidas = suscripciones.filter(filt => filt.cliente.name.toLowerCase().includes(cliente.name.toLowerCase()));
      if(incluidas.length >= 1) {
        // eslint-disable-next-line no-restricted-globals
        const opcion = confirm("El cliente tiene suscripciones, ¿desea eliminarlas?");
        if(opcion === true){
          let largo = incluidas.length;
          let idsIncluidas = [];
          for(let c=0; c < largo;c++){
           let buffer = idsIncluidas.concat(incluidas[c].id);
           idsIncluidas = buffer;
          }
          // eslint-disable-next-line no-restricted-globals
          let opcion2 = confirm("Si borra este cliente se borraran: " + idsIncluidas.length + " suscripciones ¿desea continuar?");
          if(opcion2 === true){
            for(let c=0; c < idsIncluidas.length; c++){
              await SuscripcionService.borrarSuscripcion(idsIncluidas[c]);
            }
            await ClienteService.borrarCliente(cliente.id);
            alert("Cliente y suscripciones eliminadas");
          } else{
            alert("operacion cancelada");
          }
        } else {
          alert("Operacion cancelada");
        }
      } else {
        alert("Cliente Borrado");
        ClienteService.borrarCliente(cliente.id);
      }
    }

    listarClientes(nombre,busqueda) {
      ClienteService.obtenerClientes()
      .then(resp => {
        if(nombre !== "") {
          if(busqueda === "0") {
            const data = resp.data.filter(filt => filt.name.toLowerCase().includes(nombre.toLowerCase()));
            this.setState({clientes: data});
          } else if(busqueda === "1") {
            const data = resp.data.filter(filt => filt.direccion.toLowerCase().includes(nombre.toLowerCase()));
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
              <CuentaC/>
              <div className="Container">
                <select value={this.state.busqueda} onChange={this.changeBusq} className="selectCliente">
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