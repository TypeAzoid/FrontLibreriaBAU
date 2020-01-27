import React, { Component } from "react";
import axios from "axios";

const DESCUENTOURL = "http://localhost:8080/api/v1/descuento/";

class DescuentoService extends Component {
  findAll() {
    return axios.get(DESCUENTOURL);
  }

  findOne(id) {
    return axios.get("{DESCUENTOURL}/:{id}");
  }

  post(descripcion, valorDescuento) {
    return axios.post(DESCUENTOURL, {
      descripcion: descripcion,
      valorDescuento: valorDescuento
    });
  }

  delete(id) {
    return axios.delete(DESCUENTOURL + "/" + id);
  }

  edit(id, descripcion, valorDescuento) {
    return axios.put(DESCUENTOURL + id, {
      descripcion: descripcion,
      valorDescuento: valorDescuento
    });
  }
}

export default new DescuentoService();
