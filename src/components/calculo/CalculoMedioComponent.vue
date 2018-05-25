<template>
  <div>
    <ActivityHeader color="secondary" moduleLevel="Medio" moduleName="calculo" moduleTitle="Cálculo"></ActivityHeader>
    <!-- Instrucciones -->
    <Instructions v-show="!isStarted" v-on:start-activity="startActivity()" :module="module" :level="level" levelName="Medio" levelNumber="II" color="secondary"></Instructions>
    <!-- Actividad comenzada -->
    <div v-if="isStarted">
      <div v-if="questions.length">
        <div v-if="!isEnded">
          <ProgressBar color="secondary" levelName="Medio" :numberOfQuestions="questions.length" :questionIndex="questionIndex"></ProgressBar>
          <!-- Pirámide de latas -->
          <div class="pyramid-container">
            <div>
              <div class="row" v-for="(row, index) in rows">
                <div class="number-container" v-for="(number, index2) in row">
                  <input type="checkbox" class="checkbox" :id="'row-' + index + index2 + '-' + number" v-model="answers" :value="index + '-' + index2 + '-' + number">
                  <label :for="'row-' + index + index2 + '-' + number"><span class="number">{{number}}</span></label>
                </div>
              </div>
            </div>
            <div class="correct-result">{{correctResult}}</div>
          </div>
          <!-- Bloque de comprobación de respuestas -->
          <div :class="[isAnswerChecked ? 'visible' : 'invisible']">
            <div class="empty-answer" v-if="isAnswerEmpty">
              Por favor, selecciona dos números
            </div>
            <div v-else>
              <div class="correct-answer" v-if="isAnswerCorrect">
                <i class="material-icons mens-check-circle">check_circle</i>
                ¡Correcto!
              </div>
              <div class="incorrect-answer" v-else>
                <i class="material-icons mens-cancel">cancel</i>
                Lo sentimos, es incorrecto. Las respuestas correctas son {{correctAnswers[0]}} y {{correctAnswers[1]}}
              </div>
            </div>
          </div>
        </div>
        <!-- Actividad terminada -->
        <div v-else>
          <ActivityEnd :allCorrect="areAllAnswersCorrect" color="secondary" :correctAnswers="numberOfCorrectAnswers" :numberOfQuestions="questions.length"></ActivityEnd>
        </div>
        <!-- Botones -->
        <button v-if="!isEnded" class="check-answer-button" @click="checkAnswer" :disabled="isSubmitDisabled">
          <i class="material-icons mens-visibility">visibility</i>
          Comprobar
        </button>
        <router-link v-else to="/calculo" tag="div">
          <button class="back-button">Volver a Cálculo</button>
        </router-link>
        <button class="start-again-button" @click="resetActivity" :disabled="isSubmitDisabled">
          <i class="material-icons mens-cached">cached</i>
          Volver a empezar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// Librerías
import _ from 'lodash'
// Componentes
import ActivityHeader from './../common/activity/ActivityHeaderComponent'
import ActivityEnd from './../common/activity/ActivityEndComponent'
import Instructions from './../common/instructions/InstructionsComponent'
import ProgressBar from './../common/activity/ProgressBarComponent'
// Mixins
import activityMixins from './../../mixins/activityMixins.js'

export default {
  name: 'CalculoMedioComponent',
  components: {
    ActivityHeader,
    ActivityEnd,
    Instructions,
    ProgressBar
  },
  mixins: [activityMixins],
  data: function () {
    return {
      answers: [],
      areAllAnswersCorrect: false,
      isAnswerChecked: false,
      isAnswerCorrect: false,
      isAnswerEmpty: true,
      isEnded: false,
      isStarted: false,
      isSubmitDisabled: false,
      level: 'medio',
      module: 'calculo',
      multipleActivity: true,
      numberOfCorrectAnswers: 0,
      questionIndex: 0,
      questions: []
    }
  },
  computed: {
    rows: function () { // Se crea un array con las filas de la pirámide
      var values = _.split(this.questions[this.questionIndex].field_pregunta[0].value, ',')
      const NUMBER_OF_ROWS = 3
      var dropNumber = 2
      var rows = []
      for (let i = 0; i < NUMBER_OF_ROWS; i++) {
        let rowNumbers = _.take(values, dropNumber) // Se toman los n primeros valores definidos por dropNumber
        values = _.slice(values, dropNumber) // Se extraen del array original los valores correspondientes a rowNumbers
        rows.push(rowNumbers)
        dropNumber++
      }
      return rows
    },
    correctAnswers: function () { // Se crea un array con los números correctos
      return _.split(this.questions[this.questionIndex].field_respuesta[0].value, ',')
    },
    correctResult: function () { // Se suman los números correctos para obtener el resultado final
      var correctResult = 0
      _.forEach(this.correctAnswers, function (number) {
        correctResult += _.parseInt(number)
      })
      return correctResult
    }
  },
  methods: {
    checkAnswer: function () {
      this.isAnswerChecked = true
      let twoSelected = this.answers.length === 2
      // Comprobamos si la respuesta está vacía
      if (twoSelected) {
        this.isAnswerEmpty = false
        this.isSubmitDisabled = true
        // Comprobamos si la respuesta es correcta
        this.checkIfAnswerIsCorrect()
        if (this.isAnswerCorrect) this.numberOfCorrectAnswers++
        setTimeout(() => {
          this.goToNextQuestion()
          this.isAnswerChecked = false
          this.isAnswerCorrect = false
          this.isAnswerEmpty = true
          this.isSubmitDisabled = false
        }, 2000)
      }
    },
    checkIfAnswerIsCorrect: function () {
      var userResult = 0
      _.forEach(this.answers, function (answer) {
        let answerValues = _.split(answer, '-') // El valor del checkbox es una cadena formada por tres números: fila-columna-valor
        userResult += _.parseInt(answerValues[2]) // Elegimos el último número (correspondiente al valor del número)
      })
      this.isAnswerCorrect = userResult === this.correctResult
    },
    // Función para pasar a la siguiente pregunta
    goToNextQuestion: function () {
      this.answers = [] // Inicializamos las respuestas como array vacío
      if (this.questionIndex === this.questions.length - 1) {
        this.endActivity() // Si la pregunta es la última, la actividad se termina
      } else {
        this.questionIndex++ // Si no es la última pregunta, pasamos a la siguiente
      }
    }
  },
  created () {
    this.getActivityData()
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/_variables.scss';
@import './../../assets/scss/_mixins.scss';

.visible {
  display: block;
}

.invisible {
  display: none;
}

// Pirámide de latas

.row {
  display: flex;
  justify-content: center;
  clear: both;
}

.checkbox {
  display: none;
}

.number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 66px;
  margin: -1px 0 2px 0;
  vertical-align: middle;
  cursor: pointer;
  background-image: url(../../assets/img/unselected.png);
  background-repeat: no-repeat;
  color: $background;
  font-size: 22px;
  text-align: center;
}

.checkbox:checked + label .number{
  background-image: url(../../assets/img/selected.png);
}

.number-container {
  float: left;
  display: flex;
  justify-content: center;
  margin: 0 2px;
}

.correct-result {
  font-size: 24px;
  color: $secondary;
  border: 2px solid $secondary;
  float: right;
  border-radius: 10px;
  padding: 1%;
  margin-left: 4%;
}

.pyramid-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4%;
}

// Bloque de comprobación de respuestas

.empty-answer {
  color: $secondary;
  font-size: 18px;
}

.correct-answer,
.mens-check-circle {
  font-size: 32px;
}

.correct-answer,
.mens-check-circle {
  color: $success;
}

.correct-answer,
.incorrect-answer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.incorrect-answer, .mens-cancel {
  color: $danger;
  font-size: 18px;
}

// Botones
.mens-visibility,
.mens-cached {
  vertical-align: middle;
}

.back-button,
.start-again-button,
.check-answer-button {
  font-family: $text;
  font-size: 20px;
  padding: 2% 10%;
  border: 1.5px solid $secondary;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
}

.start-again-button {
  background-color: $background;
  color: $secondary;
}

.back-button,
.check-answer-button {
  background-color: $secondary;
  color: $background;
  margin-bottom: 3%;
}

.start-again-button:disabled,
.check-answer-button:disabled {
  opacity: 0.7;
}

@media (min-width: 768px) {
  .pyramid-container {
    width: 60%;
    margin: 0 auto 6% auto;
  }

  // Bloque de comprobación de respuestas
  .visible {
    @include column-container(150px);
  }
  .invisible {
    display: block;
    height: 150px;
    visibility: hidden;
  }
  .incorrect-answer,
  .mens-cancel {
    font-size: 28px;
  }

  // Botones
  .back-button,
  .start-again-button,
  .check-answer-button {
    width: auto;
    padding: 1% 5%;
  }

  .start-again-button {
    float: left;
  }

  .back-button,
  .check-answer-button {
    float: right;
    margin-bottom: 0;
  }
}

</style>
