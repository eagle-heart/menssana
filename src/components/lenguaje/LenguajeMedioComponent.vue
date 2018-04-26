<template>
  <div>
    <ActivityHeader moduleName="lenguaje"></ActivityHeader>
    <!-- Instrucciones -->
    <Instructions v-if="!isStarted" v-on:start-activity="startActivity()" :module="module" :level="level" levelName="Medio" levelNumber="II" color="primary"></Instructions>
    <!-- Actividad comenzada -->
    <div v-else>
      <div v-if="questions.length">
        <div v-if="!isEnded">
          <!-- Caja con las posibles respuestas -->
          <div class="possible-answers-container">
            <span class="possible-answer" v-for="answer in allActivityAnswers" :id="answer">{{answer}} </span>
          </div>
          <!-- Bloque de preguntas y respuestas -->
          <div class="question">
            {{ question[0] }}
            <input class="answer" autofocus :disabled="isSubmitDisabled" type="text" v-model="answers[0]" v-on:keyup.enter="checkAnswer">
            {{ question[1] }}
            <input class="answer" :disabled="isSubmitDisabled" type="text" v-model="answers[1]" v-on:keyup.enter="checkAnswer">
            {{ question[2] }}
          </div>
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
                Lo sentimos, es incorrecto. Las respuestas correctas son:
                {{correctAnswers[0]}} y {{correctAnswers[1]}}
              </div>
            </div>
          </div>
        </div>
        <!-- Actividad terminada -->
        <div v-else>
          <ActivityEnd :allCorrect="areAllAnswersCorrect" :correctAnswers="numberOfCorrectAnswers" :numberOfQuestions="questions.length"></ActivityEnd>
        </div>
        <!-- Botones -->
        <button v-if="!isEnded" class="check-answer-button" :disabled="isSubmitDisabled" @click="checkAnswer">
          <i class="material-icons mens-visibility">visibility</i>
          Comprobar
        </button>
        <router-link v-else to="/lenguaje" tag="div">
          <button class="back-button">Volver a Lenguaje</button>
        </router-link>
        <button class="start-again-button" @click="resetActivity">
          <i class="material-icons mens-cached">cached</i>
          Volver a empezar
        </button>
      </div>
    </div>
    <Disclaimer></Disclaimer>
  </div>
</template>

<script>
// Librerías
import _ from 'lodash'
// Componentes
import ActivityHeader from './../common/activity/ActivityHeaderComponent'
import ActivityEnd from './../common/activity/ActivityEndComponent'
import Disclaimer from './../common/DisclaimerComponent'
import Instructions from './../common/instructions/InstructionsComponent'
// Mixins
import activityMixins from './../../mixins/activityMixins.js'

export default {
  name: 'LenguajeFacilComponent',
  components: {
    ActivityHeader,
    ActivityEnd,
    Disclaimer,
    Instructions
  },
  mixins: [activityMixins],
  data: function () {
    return {
      activityIndex: 0,
      answers: [],
      areAllAnswersCorrect: false,
      isAnswerChecked: false,
      isAnswerCorrect: false,
      isAnswerEmpty: true,
      isEnded: false,
      isStarted: false,
      isSubmitDisabled: false,
      level: 'medio',
      module: 'lenguaje',
      numberOfCorrectAnswers: 0,
      questions: []
    }
  },
  computed: {
    question: function () {
      return _.split(this.questions[this.activityIndex].field_pregunta[0].value, '*') // Creamos un array dividiendo la pregunta en tres partes, para insertar un input entre cada parte
    },
    correctAnswers: function () {
      return _.split(this.questions[this.activityIndex].field_respuesta[0].value, ', ') // Creamos un array con las dos respuestas correctas
    },
    allActivityAnswers: function () {
      var answersCollection = [] // Creamos un array con todas las posibles respuestas correctas

      for (let i = 0; i < this.questions.length; i++) {
        let activityAnswers = _.split(this.questions[i].field_respuesta[0].value, ', ')
        answersCollection.push(activityAnswers)
      }

      return _.shuffle(_.flatten(answersCollection)) // Hacemos aleatorio el orden de las palabras
    }
  },
  methods: {
    // Función para comprobar respuesta
    checkAnswer: function () {
      this.isAnswerChecked = true
      this.isAnswerEmpty = this.answers.length < 2 || _.includes(this.answers, undefined) || _.includes(this.answers, '') // Comprobamos si al menos una de las respuestas está vacía
      if (!this.isAnswerEmpty) {
        this.isSubmitDisabled = true // Deshabilitamos la posibilidad de comprobar respuesta
        if (_.isEqual(this.answers, this.correctAnswers)) {
          this.isAnswerCorrect = true
          this.numberOfCorrectAnswers++
        }
        setTimeout(() => {
          this.crossOut(this.correctAnswers)
          this.goToNextQuestion()
          this.isAnswerChecked = false
          this.isAnswerCorrect = false
          this.isAnswerEmpty = true
          this.isSubmitDisabled = false
          var inputs = document.getElementsByClassName('answer')
          inputs[0].disabled = false
          inputs[0].focus() // Establecemos el foco en el primer input
        }, 2000)
      }
    },
    // Función para pasar a la siguiente pregunta
    goToNextQuestion: function () {
      this.answers = [] // Inicializamos las respuestas como campos vacíos
      if (this.activityIndex === this.questions.length - 1) {
        this.endActivity()
      } else {
        this.activityIndex++
      }
    },
    // Función para tachar las palabras correctas
    crossOut: function (values) {
      for (let i = 0; i < values.length; i++) {
        let word = document.getElementById(values[i])
        word.classList.add('crossed')
      }
    }

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

// Caja con las posibles respuestas
.possible-answers-container {
  border-width: 1.5px;
  border-style: solid;
  border-color: $primary;
  border-radius: 10px;
  padding: 3%;
}

.possible-answer {
  padding-right: 1%;
  color: $primary;
}

.crossed {
  text-decoration: line-through;
}

// Bloque de preguntas y respuestas
.answer {
  font-family: $text;
  color: $primary;
  font-size: 18px;
  text-align: center;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: $primary;
  background-color: $background;
}

.answer:focus {
  outline: none;
}

.question {
  font-family: $text;
  color: $front;
  font-size: 20px;
  padding: 4% 0;
}

.empty-answer {
  color: $primary;
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
  font-size: 20px;
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
  border: 1.5px solid $primary;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
}

.start-again-button {
  background-color: $background;
  color: $primary;
}

.back-button,
.check-answer-button {
  background-color: $primary;
  color: $background;
  margin-bottom: 3%;
}

@media (min-width: 768px) {
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
  .incorrect-answer {
    font-size: 28px;
  }
}
</style>
