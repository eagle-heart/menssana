<template>
  <div>
    <ActivityHeader moduleName="lenguaje"></ActivityHeader>
    <Instructions v-if="!isStarted" v-on:start-activity="startActivity()" :module="module" :level="level" levelName="Fácil" levelNumber="I" color="primary"></Instructions>
    <div v-else>
      <div v-if="activities.length">
        <div v-if="!isEnded">
          <div class="question">{{ question }}</div>
          <div>
            <input class="answer" autofocus type="text" v-model="answer" v-on:keyup.enter="checkAnswer">
          </div>
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
                Lo sentimos, es incorrecto. Respuesta correcta: {{correctAnswer[0]}}
              </div>
            </div>
          </div>
          <button class="check-answer-button" @click="checkAnswer">
            <i class="material-icons mens-visibility">visibility</i>
            Comprobar
          </button>
          <button class="start-again-button" @click="resetActivity">
            <i class="material-icons mens-cached">cached</i>
            Volver a empezar
          </button>
        </div>
        <div class="end" v-else>
          <div v-if="areAllAnswersCorrect">
            <h4>
              <i class="material-icons mens-stars">stars</i>
              ¡Enhorabuena!
            </h4>
            <p>Todas tus respuestas son correctas</p>
          </div>
          <div v-else>
            <h4>¡Terminamos!</h4>
            <p>Has acertado {{numberOfCorrectAnswers}} preguntas de {{activities.length}}</p>
          </div>
          <router-link to="/lenguaje" tag="div">
            <button class="back-button">Volver a Lenguaje</button>
          </router-link>
          <button class="start-again-button" @click="resetActivity">
            <i class="material-icons mens-cached">cached</i>
            Volver a empezar
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
import Instructions from './../common/instructions/InstructionsComponent'
// Servicios
import ActivityService from './../../services/ActivityService'

const activityService = new ActivityService()

export default {
  name: 'LenguajeFacilComponent',
  components: {
    ActivityHeader,
    Instructions
  },
  data: function () {
    return {
      answer: '',
      isStarted: false,
      module: 'lenguaje',
      level: 'facil',
      activities: [],
      activityIndex: 0,
      isAnswerCorrect: false,
      isAnswerChecked: false,
      isAnswerEmpty: true,
      numberOfCorrectAnswers: 0,
      isEnded: false,
      areAllAnswersCorrect: false
    }
  },
  computed: {
    question: function () {
      return this.activities[this.activityIndex].field_pregunta[0].value
    },
    correctAnswer: function () {
      let rawAnswer = this.activities[this.activityIndex].field_respuesta[0].value
      return [rawAnswer, _.capitalize(rawAnswer), _.lowerCase(rawAnswer)]
    }
  },
  methods: {
    startActivity: function () {
      activityService.get(this.module, this.level)
        .then(response => {
          console.log(response.data)
          this.activities = response.data
        })
        .catch(e => {
          console.log(e)
        })
      this.isStarted = true
    },
    goToNextActivity: function () {
      this.answer = ''
      if (this.activityIndex === this.activities.length - 1) {
        this.endActivity()
      } else {
        this.activityIndex++
      }
    },
    checkAnswer: function () {
      this.isAnswerChecked = true
      if (this.answer) {
        this.isAnswerEmpty = false
        if (_.includes(this.correctAnswer, this.answer)) {
          this.isAnswerCorrect = true
          this.numberOfCorrectAnswers++
        }
        setTimeout(() => {
          this.goToNextActivity()
          this.isAnswerChecked = false
          this.isAnswerCorrect = false
          this.isAnswerEmpty = true
        }, 500)
      }
    },
    endActivity: function () {
      this.isEnded = true
      if (this.numberOfCorrectAnswers === this.activities.length) {
        this.areAllAnswersCorrect = true
      }
    },
    resetActivity: function () {
      this.isStarted = false
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/_variables.scss';
@import './../../assets/scss/_mixins.scss';

.question {
  font-family: $text;
  color: $primary;
  font-size: 56px;
  padding: 4% 0;
}

.visible {
  visibility: visible;
}

.invisible {
  visibility: hidden;
}

.empty-answer {
  color: $primary;
  font-size: 32px;
}

.correct-answer, .mens-check-circle {
  color: $success;
  font-size: 32px;
}

.mens-visibility,
.mens-cached,
.mens-stars {
  vertical-align: middle;
}

.correct-answer,
.incorrect-answer {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.incorrect-answer, .mens-cancel {
  color: $danger;
  font-size: 28px;
}

.answer {
  font-family: $text;
  color: $primary;
  font-size: 56px;
  text-align: center;
  border-width: 1px;
  border-radius: 10px;
  border-style: solid;
  border-color: $primary;
  background-color: $background;
  width: 100%;
  margin-bottom: 4%;
}

.answer:focus {
  outline: none;
  box-shadow: 0 0 4px $primary;
}

.back-button,
.start-again-button,
.check-answer-button {
  font-family: $text;
  font-size: 20px;
  padding: 2% 10%;
  border-style: solid;
  border-radius: 10px;
  border-width: 1.5px;
  border-color: $primary;
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

.end .mens-stars {
  font-size: 48px;
}

.end h4 {
  font-size: 48px;
  font-family: $brand;
  color: $primary;
}

.end p {
  font-size: 32px;
  color: $primary;
}

.check-answer-box {
  @include column-container(150px);
}

@media (min-width: 768px) {
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
