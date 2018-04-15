// Librerías
import axios from 'axios'

export default class InstructionsService {
  get (module, level) {
    let url = 'http://localhost/menssana/instrucciones?_format=json&nivel_instrucciones=' + level + '&modulo_instrucciones=' + module
    return axios.get(url)
  }
}
