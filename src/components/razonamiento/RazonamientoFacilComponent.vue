<template>
  <div>
    <ActivityHeader color="tertiary" moduleLevel="Fácil"  moduleName="razonamiento" moduleTitle="Razonamiento"></ActivityHeader>
    <!-- Instrucciones -->
    <Instructions v-show="!isStarted" v-on:start-activity="startActivity()" :module="module" :level="level" levelName="Fácil" levelNumber="I" color="tertiary"></Instructions>
    <!-- Actividad comenzada -->
    <div v-if="isStarted">
      <div class="orientation-vertical">
        Para visualizar correctamente esta actividad, coloca tu dispositivo en orientación horizontal
        <div>
          <i class="material-icons mens-rotation">screen_rotation</i>
        </div>
      </div>
      <div class="orientation-horizontal" v-if="questions.length">
        <ProgressBar color="tertiary" levelName="Fácil" :numberOfQuestions="questions.length" :questionIndex="questionIndex"></ProgressBar>
        <div>
          <!-- Bloque de preguntas y respuestas -->
          <p class="question">{{question}}</p>
          <div class="answer">
            <div class="cell number" v-for="(word, index) in answers">
              <span :id="index + 1">{{index + 1}}</span>
            </div>
            <draggable v-model="answers">
              <div class="cell" v-for="word in answers">
                <div class="word">{{word}}</div>
              </div>
            </draggable>
          </div>
          <!-- Pista -->
          <div v-if="isHintShown">
            <p class="hint">Pista: El <strong>{{correctAnswers[2]}}</strong> debe estar en la posición 3</p>
          </div>
          <!-- Bloque de comprobación de respuestas -->
          <div :class="[isAnswerChecked ? 'visible' : 'invisible']">
            <div class="correct-answer" v-if="isAnswerCorrect">
              <i class="material-icons mens-check-circle">check_circle</i>
              ¡Correcto!
            </div>
            <div class="incorrect-answer" v-else>
              <i class="material-icons mens-cancel">cancel</i>
              Lo sentimos, es incorrecto.
            </div>
          </div>
        </div>
        <!-- Botones -->
        <button v-if="!isEnded" class="check-answer-button" @click="checkAnswer" :disabled="isSubmitDisabled">
          <i class="material-icons mens-visibility">visibility</i>
          Comprobar
        </button>
        <router-link v-else to="/razonamiento" tag="div">
          <button class="back-button">Volver a Razonamiento</button>
        </router-link>
        <button class="start-again-button" @click="reset" :disabled="isSubmitDisabled && !isEnded">
          <i class="material-icons mens-cached">cached</i>
          Volver a empezar
        </button>
        <div class="hint-button-container">
          <button v-if="!isEnded" class="hint-button" @click="showHint()" :disabled="isSubmitDisabled">
            <i class="material-icons mens-play">play_arrow</i>
            Pista
          </button>
        </div>
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
import draggable from 'vuedraggable'
import Instructions from './../common/instructions/InstructionsComponent'
import ProgressBar from './../common/activity/ProgressBarComponent'
// Mixins
import activityMixins from './../../mixins/activityMixins.js'

// Servicios
import ActivityService from './../../services/ActivityService'
const activityService = new ActivityService()

export default {
  name: 'RazonamientoFacilComponent',
  components: {
    ActivityHeader,
    ActivityEnd,
    draggable,
    Instructions,
    ProgressBar
  },
  mixins: [activityMixins],
  data: function () {
    return {
      answers: [],
      isAnswerChecked: false,
      isAnswerCorrect: false,
      isEnded: false,
      isStarted: false,
      isSubmitDisabled: false,
      level: 'facil',
      module: 'razonamiento',
      multipleActivity: false,
      questionIndex: 0,
      questions: [],
      isHintShown: false
    }
  },
  computed: {
    correctAnswers: function () {
      return _.split(this.questions[0].field_respuesta[0].value, ',') // Creamos un array con las respuestas correctas
    },
    question: function () {
      return this.questions[0].field_pregunta[0].value
    }
  },
  methods: {
    // Función para comprobar respuesta
    checkAnswer: function () {
      this.isAnswerChecked = true
      this.isSubmitDisabled = true
      this.isHintShown = false
      if (_.isEqual(this.answers, this.correctAnswers)) {
        this.isAnswerCorrect = true
        this.endActivity() // Si la respuesta es correcta, termina la actividad
      } else {
        setTimeout(() => {
          this.isAnswerChecked = false
          this.isAnswerEmpty = true
          this.isSubmitDisabled = false
          let number = document.getElementById('3')
          number.classList.remove('highlighted-text')
        }, 2000)
      }
    },
    setAnswersData: function () {
      this.answers = _.shuffle(this.correctAnswers) // Creamos un array con las respuestas correctas en orden aleatorio
    },
    reset: function () {
      this.resetActivity()
      this.setAnswersData()
    },
    // Función para mostrar una pista
    showHint: function () {
      this.isHintShown = true
      let number = document.getElementById('3')
      number.classList.add('highlighted-text')
    }
  },
  created () {
    activityService.get(this.module, this.level)
      .then(response => {
        this.questions = response.data
        this.setAnswersData()
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="scss" scoped>
// Variables
@import './../../assets/scss/_variables.scss';
// Mixins
@import './../../assets/scss/_mixins.scss';

// Mensaje de orientación horizontal
@media (max-width: 479px) {
  .orientation-vertical {
    display: block;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    font-size: 24px;
    color: $tertiary;
    background-color: transparent;
  }
  .mens-rotation {
    font-size: 56px;
  }
  .orientation-horizontal {
    filter: blur(40px);
  }
}

@media (min-width: 479px) {
  .orientation-vertical {
    display: none;
  }

  .orientation-horizontal {
    filter: none;
  }
}

.visible {
  display: block;
}

.invisible {
  display: none;
}

// Bloque de preguntas y respuestas
.cell {
  float: left;
  width: calc(100% / 6);
}

.number {
  font-size: 18px;
  color: $tertiary;
}

.word {
  width: 96%;
  padding: 4% 0;
  background-color: $tertiary;
  color: $background;
  cursor: pointer;
  font-size: 14px;
}

.answer {
  height: 75px;
}

.question {
  padding-bottom: 4%;
}

.highlighted-text {
  font-weight: bold;
}

// Bloque de comprobación de respuestas

.correct-answer,
.mens-check-circle, {
  font-size: 32px;
}

.correct-answer,
.mens-check-circle {
  color: $success;
}

.incorrect-answer, .mens-cancel {
  color: $danger;
  font-size: 28px;
}

.hint {
  color: $tertiary;
  margin: 0;
}

// Botones

.mens-visibility,
.mens-cached,
.mens-play {
  vertical-align: middle;
}

.back-button,
.start-again-button,
.check-answer-button,
.hint-button {
  font-family: $text;
  font-size: 20px;
  padding: 1% 5%;
  border: 1.5px solid $tertiary;
  border-radius: 10px;
  width: auto;
  cursor: pointer;
  margin: 8% 0 2% 0;
}

.start-again-button,
.hint-button {
  background-color: $background;
  color: $tertiary;
}

.start-again-button {
  float: left;
}

.hint-button {
  margin-top: 1%;
  margin-bottom: 8%;
  width: 170px;
}

.hint-button-container {
  clear: both;
  display: flex;
  justify-content: flex-end;
}

.back-button,
.check-answer-button {
  background-color: $tertiary;
  color: $background;
  float: right;
}

.start-again-button:disabled,
.check-answer-button:disabled,
.hint-button:disabled {
  opacity: 0.7;
}

@media (min-width: 768px) {
  // Bloque de preguntas y respuestas
  .word {
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  .visible {
    @include column-container(75px);
  }
  .invisible {
    display: block;
    height: 75px;
    visibility: hidden;
    clear: both;
  }
  // Botones
  .back-button,
  .start-again-button,
  .check-answer-button {
    margin: 0px;
  }
}
</style>
