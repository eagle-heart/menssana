// Librerías
import _ from 'lodash'
// Servicios
import ActivityService from './../services/ActivityService'
const activityService = new ActivityService()

var activityMixins = {
  methods: {
    // Función para comenzar la actividad
    startActivity: function () {
      // Llamamos a la función de activityService encargada de recuperar los datos
      activityService.get(this.module, this.level)
        .then(response => {
          this.questions = response.data
        })
        .catch(e => {
          console.log(e)
        })
      this.isStarted = true
    },
    // Función para terminar la actividad
    endActivity: function () {
      this.isEnded = true
      if (this.numberOfCorrectAnswers === this.questions.length) {
        this.areAllAnswersCorrect = true
        let moduleName = _.capitalize(this.module)
        this.$store.commit('setCompletedLevel' + moduleName, this.level) // llamamos al store para establecer nivel completado
      }
    },
    // Función para resetear la actividad
    resetActivity: function () {
      this.isStarted = false
      Object.assign(this.$data, this.$options.data()) // Reinicializamos las propiedades del componente con sus valores iniciales
    }
  }
}

export default activityMixins
