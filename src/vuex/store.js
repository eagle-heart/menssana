import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// CREACIÓN DE STORE
// inicialización de estado
const state = {
  completedLevelLenguaje: {
    facil: false,
    medio: false,
    dificil: false
  },
  completedLevelCalculo: {
    facil: false,
    medio: false,
    dificil: false
  }

}
// inicialización de mutations
const mutations = {
  setCompletedLevelLenguaje: function (state, level) {
    state.completedLevelLenguaje[level] = true // establecemos nivel completado
  },
  setCompletedLevelCalculo: function (state, level) {
    state.completedLevelCalculo[level] = true // establecemos nivel completado
  }
}
// creación de store con estado y mutaciones predefinidas
export default new Vuex.Store({
  state: state,
  mutations: mutations
})
