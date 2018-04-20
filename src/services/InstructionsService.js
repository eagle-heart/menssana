// Librerías
import axios from 'axios'

// Servicio para recuperar las instrucciones
export default class InstructionsService {
  get (module, level) {
    let url = 'http://localhost/menssana/instrucciones?_format=json&nivel_instrucciones=' + level + '&modulo_instrucciones=' + module
    return axios.get(url) // Realizamos petición GET con los parámetros level y module
  }
}
