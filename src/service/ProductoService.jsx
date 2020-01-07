import axios from "axios";
import React from "react";

const ProductoURL = "http://localhost:8080/api/v1/producto";

class ProductoService extends React.Component {
  getTipos() {
    return axios.get(ProductoURL + "/tipos");
  }

  findAll() {
    return axios.get(ProductoURL);
  }

  findOne(id) {
    return axios.get("{ProductoURL}/:{id}");
  }

  delete(id) {
    return axios.delete(ProductoURL + "/" + id);
  }

  agregarProducto(nombre, tipo, precio) {
    return axios.post(ProductoURL, {
      nombre: nombre,
      tipo: tipo,
      precio: precio
    });
  }

  editarProducto(id, nombre, tipo, precio) {
    return axios.post(ProductoURL, {
      id: id,
      nombre: nombre,
      tipo: tipo,
      precio: precio
    });
  }
}

export default new ProductoService();
