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
            clienteid: "0",
            clientename: "nombre",
            clientedir: "direccion",
            buscador: "",
            busqueda: "0",

        };
        this.borrarCliente = this.borrarCliente.bind(this);
        this.editarCliente = this.editarCliente.bind(this);
        this.concreteEdit = this.concreteEdit.bind(this);
        this.listarClientes = this.listarClientes.bind(this);
    };

    busChange = (e) =>{ 
      this.setState({buscador: e.target.value});
      this.listarClientes();
    }

    changeBusq = (e) =>{ 
      this.setState({busqueda: e.target.value});
      this.listarClientes();
    }

    async editarCliente(id,nombre,direccion) {
      await this.setState({clienteid: id});
      await this.setState({clientename: nombre});
      await this.setState({clientedir: direccion});
      await this.refs.formcliente.displayeditar();
    }

    async concreteEdit(nombre,direccion) {
      if(nombre !== this.state.clientename && nombre !== "") {
        await this.setState({clientename: nombre});
      }
      if(direccion !== this.state.clientedir && direccion !== "") {
        await this.setState({clientedir: direccion});
      }
      this.refs.formcliente.undisplayeditar();
      if(this.state.clienteid !== "0") {
        await ClienteService.editarCliente(this.state.clienteid,this.state.clientename,this.state.clientedir);
      } else if (this.state.clienteid === "0") {
        await ClienteService.agregarCliente(this.state.clientename,this.state.clientedir);
      }
      await this.setState({clienteid: "0"});
      await this.setState({clientename: "Nombre"});
      await this.setState({clientedir: "Direccion"});
      this.listarClientes();
    }

    async borrarCliente(e) {
      const id = e.target.value;
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
            this.listarClientes();
            alert("Cliente y suscripciones eliminadas");
          } else{
            alert("operacion cancelada");
          }
        } else {
          alert("Operacion cancelada");
        }
      } else {
        alert("Cliente Borrado");
        await ClienteService.borrarCliente(cliente.id);
        this.listarClientes();
      }
    }

    async listarClientes() {
      let clientes = await ClienteService.obtenerClientes();
      if(this.state.buscador !== "") {
        if(this.state.busqueda === "0") {
          let data = clientes.filter(filt => filt.name.toLowerCase().includes(this.state.buscador.toLowerCase()));
          await this.setState({clientes: data});
        } else if(this.state.busqueda === "1") {
          let data = clientes.filter(filt => filt.direccion.toLowerCase().includes(this.state.buscador.toLowerCase()));
          await this.setState({clientes: data});
        } else if(this.state.busqueda === "2") {
          let data = clientes.filter(filt => filt.id === parseInt(this.state.buscador));
          await this.setState({clientes: data});
        } 
      } else {
        await this.setState({clientes: clientes});
      }
    }

    agregarCliente(nombre,direccion){
      ClienteService.agregarCliente(nombre,direccion);
      this.listarClientes();
    }

    componentDidMount() {
      this.listarClientes();
    }

    componentWillUpdate() {

    }

    render() {
          return (
            <React.Fragment>
              
              <CuentaC/>
              <div className="Container">
                <select value={this.state.busqueda} onChange={this.changeBusq} className="selectCliente">
                  <option value="0">Nombre</option>
                  <option value="1">Direccion</option>
                  <option value="2">Id</option>
                </select>
                <input type="text" className="buscadorname" placeholder="<== buscar por" value={this.state.buscador} onChange={this.busChange}></input>
                
                <FormCliente concreteEdit={this.concreteEdit}
                           clienteNombre={this.state.clientename}
                           clienteDireccion={this.state.clientedir}
                           clienteId={this.state.clienteid}
                           titulo="Editar"
                           ref="formcliente"/>
                <ClienteList listado={this.state.clientes}
                             borrarCliente = {this.borrarCliente}
                             editarCliente = {this.editarCliente}/>
              </div>
            </React.Fragment>      
          )
      }
}

export default Clientes;