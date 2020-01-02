import axios from "axios";
import React from "react";

const ProductoURL = "http://localhost:8080/api/v1/producto";

class ProductoService extends React.Component {
  constructor(props) {
    super(props);
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

  agregarProducto() {}
}

export default new ProductoService();
