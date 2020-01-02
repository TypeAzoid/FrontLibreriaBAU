import axios from 'axios'


class CuentaCorrienteDataService {

    getAllCuentaCorriente() {
        return axios.get("http://localhost:8080/api/v1/cuentacorriente")
    }
    deleteCuentaCorriente(id) {
        return axios.delete(`http://localhost:8080/api/v1/cuentacorriente/${id}`)
    }

    retrieveCuentaCorriente(id) {
        return axios.get(`http://localhost:8080/api/v1/cuentacorriente/${id}`)
    }
}

export default new CuentaCorrienteDataService()