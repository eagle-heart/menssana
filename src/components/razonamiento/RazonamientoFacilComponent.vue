<template>
  <div>
    <ActivityHeader color="tertiary"  moduleName="razonamiento" moduleTitle="Razonamiento"></ActivityHeader>
    <!-- Instrucciones -->
    <Instructions v-if="!isStarted" v-on:start-activity="setStarted()" :module="module" :level="level" levelName="Fácil" levelNumber="I" color="tertiary"></Instructions>
    <!-- Actividad comenzada -->
    <div v-else>
      <div class="orientation-vertical">
        Para visualizar correctamente esta actividad, coloca tu dispositivo en orientación horizontal
        <div>
          <i class="material-icons mens-rotation">screen_rotation</i>
        </div>
      </div>
      <div class="orientation-horizontal" v-if="questions.length">
        <div>
          <!-- Bloque de preguntas y respuestas -->
          <p class="question">{{question}}</p>
          <div class="answer">
            <div class="cell number" v-for="(word, index) in answers">
              {{index + 1}}
            </div>
            <draggable v-model="answers" @start="drag=true" @end="drag=false">
                <div class="cell" v-for="word in answers">
                  <div class="word">{{word}}</div>
                </div>
            </draggable>
          </div>
          <!-- Bloque de comprobación de respuestas -->
          <div :class="[isAnswerChecked ? 'visible' : 'invisible', 'checkAnswer']">
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
        <button v-if="!isEnded" class="check-answer-button" @click="checkAnswer">
          <i class="material-icons mens-visibility">visibility</i>
          Comprobar
        </button>
        <router-link v-else to="/razonamiento" tag="div">
          <button class="back-button">Volver a Razonamiento</button>
        </router-link>
        <button class="start-again-button" @click="resetActivity">
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
import draggable from 'vuedraggable'
import Instructions from './../common/instructions/InstructionsComponent'

// Servicios
import ActivityService from './../../services/ActivityService'
const activityService = new ActivityService()

export default {
  name: 'RazonamientoFacilComponent',
  components: {
    ActivityHeader,
    ActivityEnd,
    draggable,
    Instructions
  },
  data: function () {
    return {
      answers: [],
      isAnswerChecked: false,
      isAnswerCorrect: false,
      isEnded: false,
      isStarted: false,
      level: 'facil',
      module: 'razonamiento',
      questions: []
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
      if (_.isEqual(this.answers, this.correctAnswers)) {
        this.isAnswerCorrect = true
        this.isEnded = true
        let moduleName = _.capitalize(this.module)
        this.$store.commit('setCompletedLevel' + moduleName, this.level) // llamamos al store para establecer nivel completado
      } else {
        setTimeout(() => {
          this.isAnswerChecked = false
          this.isAnswerEmpty = true
        }, 3000)
      }
    },
    setAnswersData: function () {
      this.answers = _.shuffle(this.correctAnswers) // Creamos un array con las respuestas correctas en orden aleatorio
    },
    resetActivity: function () {
      this.isAnswerChecked = false
      this.isAnswerCorrect = false
      this.isEnded = false
      this.isStarted = false
      this.setAnswersData()
    },
    setStarted: function () {
      this.isStarted = true
    }
  },
  beforeMount () {
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
  height: 50px;
}

.question {
  padding: 4% 0;
}

.correct-answer,
.mens-check-circle {
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
  padding: 1% 5%;
  border: 1.5px solid $tertiary;
  border-radius: 10px;
  width: auto;
  cursor: pointer;
  margin: 8% 0;
}

.start-again-button {
  background-color: $background;
  color: $tertiary;
  float: left;
}

.back-button,
.check-answer-button {
  background-color: $tertiary;
  color: $background;
  float: right;
  margin-bottom: 6%;
}

@media (min-width: 768px) {
  // Bloque de preguntas y respuestas
  .word {
    font-size: 16px;
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
  // Botones
  .back-button,
  .start-again-button,
  .check-answer-button {
    margin: 0px;
  }
}
</style>