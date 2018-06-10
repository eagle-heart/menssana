// Librerías
import _ from 'lodash'
// Servicios
import ActivityService from './../services/ActivityService'
const activityService = new ActivityService()

var activityMixins = {
  methods: {
    // Función para comenzar la actividad
    startActivity: function () {
      this.isStarted = true
    },
    // Función para terminar la actividad
    endActivity: function () {
      this.isEnded = true
      if (this.multipleActivity) {
        // Si la actividad tiene varios ejercicios, comprobamos si todas las respuestas son correctas
        if (this.numberOfCorrectAnswers === this.questions.length) {
          this.areAllAnswersCorrect = true
          this.completeActivity() // Completamos el nivel
        }
      } else {
        this.completeActivity() // Completamos el nivel
      }
    },
    // Función para completar la actividad
    completeActivity: function () {
      let moduleName = _.capitalize(this.module)
      this.$store.commit('setCompletedLevel' + moduleName, this.level) // llamamos al store para establecer nivel completado
    },
    // Función para recuperar los datos
    getActivityData: function () {
      activityService.get(this.module, this.level)
        .then((response) => {
          this.questions = response.data
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // Función para resetear la actividad
    resetActivity: function () {
      this.isAnswerChecked = false
      this.isAnswerCorrect = false
      this.isEnded = false
      this.isStarted = false
      this.isSubmitDisabled = false
      if (typeof this.isAnswerEmpty !== 'undefined') this.isAnswerEmpty = true
      if (typeof this.answer !== 'undefined') this.answer = ''
      if (typeof this.answers !== 'undefined') this.answers = []
      if (typeof this.isHintShown !== 'undefined') this.isHintShown = false
      // Si la actividad tiene varios ejercicios, reiniciamos las variables relacionadas con el número de preguntas
      if (this.multipleActivity) {
        this.areAllAnswersCorrect = false
        this.numberOfCorrectAnswers = 0
        this.questionIndex = 0
      }
    }
  }
}

export default activityMixins
