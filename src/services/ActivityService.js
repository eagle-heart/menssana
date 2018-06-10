// Librerías
import axios from 'axios'

// Servicio para recuperar las actividades
export default class ActivityService {
  get (module, level) {
    let url = 'http://menssana-api.herokuapp.com/actividades?_format=json&nivel=' + level + '&modulo=' + module
    return axios.get(url) // Realizamos petición GET con los parámetros level y module
  }
}
