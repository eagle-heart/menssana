<template>
  <div>
    <ActivityHeader color="secondary" moduleLevel="Fácil" moduleName="calculo" moduleTitle="Cálculo"></ActivityHeader>
    <!-- Instrucciones -->
    <Instructions v-show="!isStarted" v-on:start-activity="startActivity()" :module="module" :level="level" levelName="Fácil" levelNumber="I" color="secondary"></Instructions>
    <!-- Actividad comenzada -->
    <div v-if="isStarted">
      <div v-if="questions.length">
        <ProgressBar color="secondary" levelName="Fácil" :numberOfQuestions="1" :questionIndex="questionIndex"></ProgressBar>
        <div>
          <!-- Futbolín -->
          <div class="ball"></div>
          <div class="row">
            <div class="number-container" v-for="number in rows[0]">
              <input type="radio" class="radio" :id="'first-row-' + number" v-model="answers[0]" :value="number" :disabled="isSubmitDisabled">
              <label :for="'first-row-' + number"><span class="number">{{number}}</span></label>
            </div>
          </div>
          <div class="row">
            <div class="number-container" v-for="number in rows[1]">
              <input type="radio" class="radio" :id="'second-row-' + number" v-model="answers[1]" :value="number" :disabled="isSubmitDisabled">
              <label :for="'second-row-' + number"><span class="number">{{number}}</span></label>
            </div>
          </div>
          <div class="row">
            <div class="number-container" v-for="number in rows[2]">
              <input type="radio" class="radio" :id="'third-row-' + number" v-model="answers[2]" :value="number" :disabled="isSubmitDisabled">
              <label :for="'third-row-' + number"><span class="number">{{number}}</span></label>
            </div>
          </div>
          <div class="correct-result">{{correctResult}}</div>
          <!-- Bloque de comprobación de respuestas -->
          <div :class="[isAnswerChecked ? 'visible' : 'invisible']">
            <div class="empty-answer" v-if="isAnswerEmpty">
              Por favor, selecciona un número para cada fila
            </div>
            <div v-else>
              <div class="correct-answer" v-if="isAnswerCorrect">
                <i class="material-icons mens-check-circle">check_circle</i>
                ¡Correcto!
              </div>
              <div class="incorrect-answer" v-else>
                <i class="material-icons mens-cancel">cancel</i>
                Lo sentimos, es incorrecto. La suma de los tres números que has seleccionado es {{result}}
              </div>
            </div>
          </div>
        </div>
        <!-- Botones -->
        <button v-if="!isEnded" class="check-answer-button" @click="checkAnswer" :disabled="isSubmitDisabled">
          <i class="material-icons mens-visibility">visibility</i>
          Comprobar
        </button>
        <router-link v-else to="/calculo" tag="div">
          <button class="back-button">Volver a Cálculo</button>
        </router-link>
        <button class="start-again-button" @click="resetActivity" :disabled="isSubmitDisabled && !isEnded">
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
  name: 'CalculoFacilComponent',
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
      isAnswerChecked: false,
      isAnswerCorrect: false,
      isAnswerEmpty: true,
      isEnded: false,
      isStarted: false,
      isSubmitDisabled: false,
      level: 'facil',
      module: 'calculo',
      multipleActivity: false,
      questionIndex: 0,
      questions: []
    }
  },
  computed: {
    rows: function () { // Se crea un array con las filas del futbolín
      var activityRows = []
      _.forEach(this.questions, function (item) {
        let row = _.split(item.field_pregunta[0].value, ',')
        activityRows.push(row)
      })
      return activityRows
    },
    correctAnswers: function () { // Se crea un array con los números correctos
      var correctAnswers = []
      _.forEach(this.questions, function (item) {
        let correctAnswer = item.field_respuesta[0].value
        correctAnswers.push(correctAnswer)
      })
      return correctAnswers
    },
    correctResult: function () { // Se suman los números correctos para obtener el resultado final
      var correctResult = 0
      _.forEach(this.questions, function (item) {
        let correctAnswer = _.parseInt(item.field_respuesta[0].value)
        correctResult += correctAnswer
      })
      return correctResult
    },
    result: function () { // Se suman los números que ha seleccionado el usuario
      var result = 0
      _.map(this.answers, _.parseInt)
      _.forEach(this.answers, function (item) {
        result += _.parseInt(item)
      })
      return result
    }
  },
  methods: {
    checkAnswer: function () {
      this.isAnswerChecked = true
      let anyRowNotFilled = this.answers.length < 3 || _.includes(this.answers, undefined) || _.includes(this.answers, '')
      // Comprobamos si la respuesta está vacía
      if (!anyRowNotFilled) {
        this.isAnswerEmpty = false
        this.isSubmitDisabled = true // Deshabilitamos la posibilidad de comprobar respuesta
        // Comprobamos si la respuesta es correcta
        if (_.isEqual(this.correctAnswers, this.answers)) {
          this.isAnswerCorrect = true
          this.endActivity() // Si la respuesta es correcta, termina la actividad
        } else {
          setTimeout(() => {
            this.answers = [] // Inicializamos las respuestas como campos vacíos
            this.isSubmitDisabled = false
            this.isAnswerChecked = false
            this.isAnswerEmpty = true
          }, 2000)
        }
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

// Futbolín
.ball {
  height: 32px;
  width: 32px;
  margin: 4% auto;
  background-color: $secondary;
  border-radius: 50%;
}

.row {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 4%;
  height: 42px;
}

.radio {
  display: none;
}

.number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin: -1px 0 0 0;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 50%;
  background-color: $background;
  color: $secondary;
  font-size: 22px;
  text-align: center;
}

.radio:checked + label .number{
  background-color: #fbd0d8;
}

.number-container {
  width: calc(33.33% - 4px);
  float: left;
  border-left: 2px solid $secondary;
  display: flex;
  justify-content: center;
}

.number-container:nth-child(3) {
  border-right: 2px solid $secondary;
}

.correct-result {
  font-size: 24px;
  color: $background;
  background-color: $secondary;
  width: 75px;
  margin: 4% auto;
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
  .row {
    width: 45%;
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
