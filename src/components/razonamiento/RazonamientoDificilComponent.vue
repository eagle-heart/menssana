<template>
  <div>
    <ActivityHeader color="tertiary" moduleLevel="Difícil" moduleName="razonamiento" moduleTitle="Razonamiento"></ActivityHeader>
    <!-- Instrucciones -->
    <Instructions v-show="!isStarted" v-on:start-activity="startActivity()" :module="module" :level="level" levelName="Difícil" levelNumber="III" color="tertiary"></Instructions>
    <!-- Actividad comenzada -->
    <div v-show="isStarted">
      <div v-if="questions.length">
        <div v-if="!isEnded" class="block">
          <ProgressBar color="tertiary" levelName="Difícil" :numberOfQuestions="questions.length" :questionIndex="questionIndex"></ProgressBar>
          <!-- Bloque de preguntas y respuestas -->
          <div class="question">{{ question }}</div>
          <!-- Preguntas de seleccionar una respuesta -->
          <div v-if="questionIndex !== questions.length - 1">
            <div class="answer-container" v-for="(option, index) in possibleAnswers">
              <input type="radio" class="radio" v-model="answer" :id="'option' + index" :value="option" :disabled="isSubmitDisabled">
              <label :for="'option' + index">
                <span class="option">
                  <i class="material-icons radio-unchecked">radio_button_unchecked</i>
                  <i class="material-icons radio-checked">radio_button_checked</i>
                </span>
                <span class="option-text">{{option}}</span>
              </label>
            </div>
          </div>
          <!-- Última pregunta (serie de letras) -->
          <div v-else class="letters-container">
            <div class="activity-letters">
              <div class="letters" v-for="row in possibleAnswers">{{row}}</div>
            </div>
            <div class="user-letters"><input autofocus class="input-letters" v-model="answer"></div>
          </div>
          <div class="clearfix"></div>
          <!-- Bloque de comprobación de respuestas -->
          <div :class="[isAnswerChecked ? 'visible' : 'invisible']">
            <div class="empty-answer" v-if="isAnswerEmpty">
              Por favor, introduce una respuesta
            </div>
            <div v-else>
              <div class="correct-answer" v-if="isAnswerCorrect">
                <i class="material-icons mens-check-circle">check_circle</i>
                ¡Correcto!
              </div>
              <div class="incorrect-answer" v-else>
                <i class="material-icons mens-cancel">cancel</i>
                Lo sentimos, es incorrecto. Respuesta correcta: {{correctAnswers[0]}}
              </div>
            </div>
          </div>
        </div>
        <!-- Actividad terminada -->
        <div v-else>
          <ActivityEnd :allCorrect="areAllAnswersCorrect" color="tertiary" :correctAnswers="numberOfCorrectAnswers" :numberOfQuestions="questions.length"></ActivityEnd>
        </div>
        <!-- Botones -->
        <button v-if="!isEnded" class="check-answer-button" @click="checkAnswer" :disabled="isSubmitDisabled">
          <i class="material-icons mens-visibility">visibility</i>
          Comprobar
        </button>
        <router-link v-else to="/razonamiento" tag="div">
          <button class="back-button">Volver a Razonamiento</button>
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
  name: 'LenguajeFacilComponent',
  components: {
    ActivityHeader,
    ActivityEnd,
    Instructions,
    ProgressBar
  },
  mixins: [activityMixins],
  data: function () {
    return {
      answer: '',
      areAllAnswersCorrect: false,
      isAnswerChecked: false,
      isAnswerCorrect: false,
      isAnswerEmpty: true,
      isEnded: false,
      isStarted: false,
      isSubmitDisabled: false,
      level: 'dificil',
      module: 'razonamiento',
      multipleActivity: true,
      numberOfCorrectAnswers: 0,
      questionIndex: 0,
      questions: []
    }
  },
  computed: {
    correctAnswers: function () {
      if (this.questionIndex === this.questions.length - 1) {
        let rawAnswer = this.questions[this.questionIndex].field_respuesta[0].value // Respuesta correcta
        return [rawAnswer, _.capitalize(rawAnswer), _.lowerCase(rawAnswer)]
      } else {
        return [this.questions[this.questionIndex].field_respuesta[0].value] // Respuesta correcta
      }
    },
    question: function () {
      return _.head(_.split(this.questions[this.questionIndex].field_pregunta[0].value, '*')) // Creamos un array y retornamos el primer elemento, que será la pregunta
    },
    possibleAnswers: function () {
      return _.drop(_.split(this.questions[this.questionIndex].field_pregunta[0].value, '*'), 1) // Creamos un array y retornamos todos los elementos menos el primero, que serán las respuestas correctas
    }
  },
  methods: {
    // Función para comprobar respuesta
    checkAnswer: function () {
      this.isAnswerChecked = true
      // Comprobamos si la respuesta está vacía
      if (this.answer) {
        this.isAnswerEmpty = false
        this.isSubmitDisabled = true // Deshabilitamos la posibilidad de comprobar respuesta
        // Comprobamos si la respuesta es correcta
        if (_.includes(this.correctAnswers, this.answer)) {
          this.isAnswerCorrect = true
          this.numberOfCorrectAnswers++
        }
        setTimeout(() => {
          this.goToNextQuestion()
          this.isAnswerChecked = false
          this.isAnswerCorrect = false
          this.isAnswerEmpty = true
          this.isSubmitDisabled = false
        }, 2000)
      }
    },
    // Función para pasar a la siguiente pregunta
    goToNextQuestion: function () {
      this.answer = '' // Inicializamos la respuesta como campo vacío
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
// Variables
@import './../../assets/scss/_variables.scss';
// Mixins
@import './../../assets/scss/_mixins.scss';

.visible {
  display: block;
}

.invisible {
  display: none;
}

.clearfix {
  clear: both;
}

.block {
  margin-bottom: 8%;
}

// Bloque de preguntas y respuestas

// Preguntas de seleccionar una respuesta

.question,
.answer-container {
  text-align: left;
}

.answer-container {
  float: left;
  width: 100%;
  padding: 2% 0;
}

.question {
  padding: 4% 0;
  font-size: 18px;
  color: $front;
}

.radio,
.radio-checked,
.radio:checked + label .option .radio-unchecked {
  display: none;
}

.option {
  cursor: pointer;
  float: left;
  clear: both;
  color: $tertiary;
}

.radio-unchecked,
.radio:checked + label .option .radio-checked {
  display: block;
}

.option-text {
  font-size: 22px;
  line-height: 1.2;
  color: $tertiary;
  padding-left: 3%;
}

// Última pregunta (serie de letras)

.letters-container {
  width: 80%;
  margin: auto;
  height: 100px;
}

.activity-letters,
.user-letters {
  float: left;
  display: inline-block;
  height: 100px;
}

.activity-letters {
  width: 60%;
}

.user-letters {
  width: 39%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.letters {
  text-align: left;
  letter-spacing: 4px;
}

.letters, .input-letters {
  color: $tertiary;
  font-family: $text;
  font-size: 18px;
}

.input-letters {
  letter-spacing: 4px;
  width: 100%;
  background-color: $background;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid $tertiary;
}

.input-letters:focus {
  outline: none;
}

// Bloque de comprobación de respuestas

.empty-answer {
  color: $tertiary;
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
  font-size: 28px;
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
  border: 1.5px solid $tertiary;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
}

.start-again-button {
  background-color: $background;
  color: $tertiary;
}

.back-button,
.check-answer-button {
  background-color: $tertiary;
  color: $background;
  margin-bottom: 3%;
}

.start-again-button:disabled,
.check-answer-button:disabled {
  opacity: 0.7;
}

@media (min-width: 768px) {
  // Bloque de preguntas y respuestas
  .answer-container {
    width: 50%;
  }

  .letters-container {
    width: 60%;
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

@media (min-width: 1024px) {
  .visible {
    @include column-container(150px);
  }
  .invisible {
    display: block;
    height: 150px;
    visibility: hidden;
  }
  .block {
    margin-bottom: 0px;
  }
}
</style>
