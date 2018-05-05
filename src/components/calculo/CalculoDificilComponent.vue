<template>
  <div>
    <ActivityHeader color="secondary"  moduleName="calculo" moduleTitle="Cálculo"></ActivityHeader>
    <!-- Instrucciones -->
    <Instructions v-if="!isStarted" v-on:start-activity="startActivity()" :module="module" :level="level" levelName="Difícil" levelNumber="III" color="secondary"></Instructions>
    <!-- Actividad comenzada -->
    <div v-else>
      <div v-if="questions.length">
        <div v-if="!isEnded">
          <!-- Bloque de preguntas y respuestas -->
          <div class="question">
            <div class="operation">
              <span class="number">{{ question[0] }}</span>
              <input class="answer" autofocus :disabled="isSubmitDisabled" type="text" v-model="answers[0]" v-on:keyup.enter="checkAnswer">
              <span class="number">{{ question[1] }}</span>
              <input class="answer" :disabled="isSubmitDisabled" type="text" v-model="answers[1]" v-on:keyup.enter="checkAnswer">
              <span class="number">{{ question[2] }}</span>
            </div>
            <div class="result">
              <span class="number">=</span>
              <span class="number">{{ question[3] }}</span>
            </div>
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
          <ActivityEnd :allCorrect="areAllAnswersCorrect" color="secondary" :correctAnswers="numberOfCorrectAnswers" :numberOfQuestions="questions.length"></ActivityEnd>
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
      level: 'dificil',
      module: 'calculo',
      numberOfCorrectAnswers: 0,
      questions: []
    }
  },
  computed: {
    question: function () {
      return _.split(this.questions[this.activityIndex].field_pregunta[0].value, ',') // Creamos un array dividiendo la pregunta en cuatro partes (los tres números de la operación y el resultado)
    },
    correctAnswers: function () {
      return _.split(this.questions[this.activityIndex].field_respuesta[0].value, ',') // Creamos un array con las dos respuestas correctas
    }
  },
  methods: {
    // Función para comprobar respuesta
    checkAnswer: function () {
      this.isAnswerChecked = true
      this.isAnswerEmpty = this.answers.length < 2 || _.includes(this.answers, undefined) || _.includes(this.answers, '') // Comprobamos si al menos una de las respuestas está vacía
      if (!this.isAnswerEmpty) {
        this.isSubmitDisabled = true // Deshabilitamos la posibilidad de comprobar respuesta
        this.checkIfAnswersAreCorrect() // Comprobamos si ambas respuestas son correctas
        if (this.isAnswerCorrect) this.numberOfCorrectAnswers++
        setTimeout(() => {
          this.goToNextQuestion()
          this.isAnswerChecked = false
          this.isAnswerCorrect = false
          this.isAnswerEmpty = true
          this.isSubmitDisabled = false
          var inputs = document.getElementsByClassName('answer')
          inputs[0].disabled = false
          inputs[0].focus() // Establecemos el foco en el primer input
        }, 1500)
      }
    },
    checkIfAnswersAreCorrect: function () {
      this.isAnswerCorrect = _.isEqual(this.answers, this.correctAnswers)
    },
    // Función para pasar a la siguiente pregunta
    goToNextQuestion: function () {
      this.answers = [] // Inicializamos las respuestas como campos vacíos
      if (this.activityIndex === this.questions.length - 1) {
        this.endActivity()
      } else {
        this.activityIndex++
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

// Bloque de preguntas y respuestas
.answer {
  font-family: $text;
  color: $secondary;
  font-size: 32px;
  width: 32px;
  height: 32px;
  text-align: center;
  border-width: 2px;
  border-style: solid;
  border-color: $secondary;
  background-color: $background;
}

.answer:focus {
  outline: none;
}

.question {
  font-family: $text;
  color: $secondary;
  padding: 4%;
}

.operation {
  font-size: 36px;
}

.result {
  font-size: 64px;
}

.number {
  padding: 0 2%;
}

.answer,
.question,
.number {
  vertical-align: middle;
}

// Bloque de comprobación de respuestas

.empty-answer {
  color: $secondary;
  font-size: 18px;
}

.correct-answer,
.mens-check-circle {
  font-size: 32px;
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

@media (min-width: 768px) {
  .operation,
  .result {
    display: inline;
    font-size: 64px;
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
  .incorrect-answer,
  .mens-cancel {
    font-size: 28px;
  }
}
</style>