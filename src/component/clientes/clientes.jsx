import React from 'react';
import { Component } from 'react';
import ClienteList from './ClienteList';
import ReactDOM from 'react-dom';
import './cliente.css'

export default class Clientes extends Component {
  constructor () {
        super();
        this.state = {
            clientes: [],
            nombre: '',
            direccion: '',
        };
        global.id = 0;
    };

    idChange(e){ 
      global.id = e;
      console.log(global.id)
    }

    editarCliente(nombre,dir){
      console.log(nombre);
      console.log(dir);
      console.log(global.id);
      if(global.id !== 0 && nombre !== "" && dir !== "") {
        fetch('http://localhost:8080/api/v1/cliente/' + global.id, {
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
      this.setState({ nombre : ""})
      this.setState({ direccion : ""})
      global.id = 0;
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
      fetch('http://localhost:8080/api/v1/cliente')
          .then((response) => {
            return response.json()
          })
          .then((clientes) => {
            this.setState({ clientes: clientes })
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
      this.setState({ nombre : ""})
      this.setState({ direccion : ""})
    }
    nameChange = (e) =>{ 
      this.setState({nombre: e.target.value});
    }
    dirChange = (e) =>{ 
      this.setState({direccion: e.target.value});
    }
    componentDidMount() {
      setInterval(() => this.listarClientes(), 500);
      setInterval(() => this.forceUpdate(), 500);
    }
    render() {
        if (this.state.clientes.length > 0) {
          return (
            <React.Fragment>
              <div className="Container">
                <input type="text" name="Nombre" className="formnombre" placeholder="Nombre" value={this.state.nombre} onChange={this.nameChange}/>
                <input type="text" name="Direccion" className="formdir" placeholder="Direccion" value={this.state.direccion} onChange={this.dirChange}/>
                <button onClick={() => this.agregarCliente(this.state.nombre,this.state.direccion)} className="botonadd">Agregar</button>
                <button onClick={() => this.editarCliente(this.state.nombre,this.state.direccion)} className="botonadd">Editar</button>
                <ClienteList listado={this.state.clientes} />
              </div>
            </React.Fragment>      
          )
        } else {
          return <p className="text-center">Cargando Clientes...</p>
        }
      }
}
