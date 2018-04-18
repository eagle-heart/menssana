// Librerías
import axios from 'axios'

export default class ActivityService {
  get (module, level) {
    let url = 'http://localhost/menssana/actividades?_format=json&nivel=' + level + '&modulo=' + module
    return axios.get(url)
  }
}
