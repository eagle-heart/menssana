<template>
  <div>
    <ActivityHeader color="tertiary"  moduleName="razonamiento" moduleTitle="Razonamiento"></ActivityHeader>
    <!-- Instrucciones -->
    <Instructions v-if="!isStarted" v-on:start-activity="startActivity()" :module="module" :level="level" levelName="Medio" levelNumber="II" color="tertiary"></Instructions>
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
          <p class="question" v-html="question"></p>
          <div class="answer">
            <!-- Categorías nombre, prenda, color y material -->
            <div class="column-title" v-for="category in categories">{{category}}</div>
            <div class="column" v-for="(category, index) in answers">
              <!-- Los nombres son celdas fijas (no se pueden arrastrar) -->
              <div v-if="index === 0">
                <div class="cell" v-for="word in category">
                  <div class="name">{{word}}</div>
                </div>
              </div>
              <!-- Las categorías prenda, color y material se pueden arrastrar y ordenar -->
              <draggable v-else v-model="answers[index]" @start="drag=true" @end="drag=false">
                <div class="cell" v-for="word in category">
                  <div class="word">{{word}}</div>
                </div>
              </draggable>
            </div>
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
        <button v-if="!isEnded" class="check-answer-button" @click="checkAnswer">
          <i class="material-icons mens-visibility">visibility</i>
          Comprobar
        </button>
        <router-link v-else to="/razonamiento" tag="div">
          <button class="back-button">Volver a Razonamiento</button>
        </router-link>
        <button class="start-again-button" @click="reset">
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
    Instructions
  },
  mixins: [activityMixins],
  data: function () {
    return {
      answers: [],
      categories: ["Nombre", "Prenda", "Color", "Material"],
      isAnswerChecked: false,
      isAnswerCorrect: false,
      isEnded: false,
      isStarted: false,
      level: 'medio',
      module: 'razonamiento',
      multipleActivity: false,
      questions: []
    }
  },
  computed: {
    correctAnswers: function () {
      let correctAnswers = []
      let categories = _.split(this.questions[0].field_respuesta[0].value, '*')
      _.forEach(categories, function (item) {
        correctAnswers.push(_.split(item, ','))  // Creamos un array con otros cuatro arrays que incluyen las respuestas correctas para cada categoría
      })
      return correctAnswers
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
        this.endActivity() // Si la respuesta es correcta, termina la actividad
      } else {
        setTimeout(() => {
          this.isAnswerChecked = false
          this.isAnswerEmpty = true
        }, 2000)
      }
    },
    setAnswersData: function () { // Función que carga la tabla con las palabras
      this.answers = []
      let answers = this.answers
      _.forEach(this.correctAnswers, function (item, index) {
        if (index === 0) {
          answers.push(item) // Mantenemos los nombres en el mismo orden
        } else {
          answers.push(_.shuffle(item)) // Cambiamos el orden de las respuestas correctas para las categorías prenda, color y material
        }
      })
    },
    reset: function () {
      this.resetActivity()
      this.setAnswersData()
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
.column,
.column-title {
  width: calc(100% / 4);
  float: left;
}

.column-title {
  color: $tertiary;
  font-size: 18px;
  padding-bottom: 1%;
}

.word,
.name {
  font-size: 14px;
  margin-bottom: 4%;
}

.word {
  background-color: $tertiary;
  color: $background;
  cursor: pointer;
  padding: 4% 0;
  width: 96%;
}

.name {
  border: 1px solid $tertiary;
  width: calc(96% - 1px);
  margin-bottom: 4%;
  color: $tertiary;
  padding-top: calc(4% - 1px);
  padding-bottom: calc(4% - 1px);
}

.question {
  padding: 4% 0 1% 0;
  list-style-position: inside;
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
  .cell {
    font-size: 16px;
  }
  // Bloque de comprobación de respuestas
  .visible {
    @include column-container(32px);
  }
  .invisible {
    display: block;
    height: 32px;
    visibility: hidden;
    clear: both;
  }
  // Botones
  .back-button,
  .start-again-button,
  .check-answer-button {
    margin: 2% 0;
  }
}
</style>
