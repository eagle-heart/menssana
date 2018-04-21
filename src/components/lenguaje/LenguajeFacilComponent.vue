<template>
  <div>
    <ActivityHeader moduleName="lenguaje"></ActivityHeader>
    <!-- Instrucciones -->
    <Instructions v-if="!isStarted" v-on:start-activity="startActivity()" :module="module" :level="level" levelName="Fácil" levelNumber="I" color="primary"></Instructions>
    <!-- Actividad comenzada -->
    <div v-else>
      <div v-if="questions.length">
        <div v-if="!isEnded">
          <!-- Bloque de preguntas y respuestas -->
          <div class="question">{{ question }}</div>
          <div>
            <input class="answer" autofocus type="text" v-model="answer" :disabled="isSubmitDisabled" v-on:keyup.enter="checkAnswer">
          </div>
          <!-- Bloque de comprobación de respuestas -->
          <div :class="[isAnswerChecked ? 'visible' : 'invisible', 'check-answer-box']">
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
          <ActivityEnd :allCorrect="areAllAnswersCorrect" :correctAnswers="numberOfCorrectAnswers" :numberOfQuestions="questions.length"></ActivityEnd>
        </div>
        <!-- Botones -->
        <button v-if="!isEnded" class="check-answer-button" @click="checkAnswer" :disabled="isSubmitDisabled">
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
      answer: '',
      areAllAnswersCorrect: false,
      isAnswerChecked: false,
      isAnswerCorrect: false,
      isAnswerEmpty: true,
      isEnded: false,
      isStarted: false,
      isSubmitDisabled: false,
      level: 'facil',
      module: 'lenguaje',
      numberOfCorrectAnswers: 0,
      questionIndex: 0,
      questions: []
    }
  },
  computed: {
    correctAnswers: function () {
      let rawAnswer = this.questions[this.questionIndex].field_respuesta[0].value
      return [rawAnswer, _.capitalize(rawAnswer), _.lowerCase(rawAnswer)] // La respuesta será correcta en mayúsculas, minúsculas y con la primera letra mayúscula
    },
    question: function () {
      return this.questions[this.questionIndex].field_pregunta[0].value
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
          // Establecemos el foco en el input de nuevo
          var inputs = document.getElementsByClassName('answer')
          inputs[0].disabled = false
          inputs[0].focus()
        }, 1500)
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
  }
}
</script>

<style lang="scss" scoped>
// Variables
@import './../../assets/scss/_variables.scss';
// Mixins
@import './../../assets/scss/_mixins.scss';

.visible {
  visibility: visible;
}

.invisible {
  visibility: hidden;
}

// Bloque de preguntas y respuestas
.question, .answer {
  color: $primary;
  font-family: $text;
  font-size: 56px;
}

.question {
  padding: 4% 0;
}

.answer {
  background-color: $background;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid $primary;
  margin-bottom: 4%;
  text-align: center;
  width: 90%;
}

.answer:focus {
  outline: none;
}

// Bloque de comprobación de respuestas
.check-answer-box {
  @include column-container(150px);
}

.empty-answer {
  color: $primary;
}

.correct-answer,
.mens-check-circle,
.empty-answer {
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
  // Bloque de preguntas y respuestas
  .answer {
    width: 50%;
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
