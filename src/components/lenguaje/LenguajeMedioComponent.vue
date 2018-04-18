<template>
  <div>
    <ActivityHeader moduleName="lenguaje"></ActivityHeader>
    <Instructions v-if="!isStarted" v-on:start-activity="startActivity()" :module="module" :level="level" levelName="Medio" levelNumber="II" color="primary"></Instructions>
    <div v-else>
      <div v-if="activities.length">
        <div v-if="!isEnded">
          <div class="possible-answers-container">
            <span class="possible-answer" v-for="answer in allActivityAnswers" :id="answer">{{answer}} </span>
          </div>
          <div class="question">
            {{ question[0] }}
            <input class="answer" autofocus type="text" v-model="answers[0]" v-on:keyup.enter="checkAnswer">
            {{ question[1] }}
            <input class="answer" type="text" v-model="answers[1]" v-on:keyup.enter="checkAnswer">
            {{ question[2] }}
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
                Lo sentimos, es incorrecto. Las respuestas correctas son:
                {{correctAnswers[0]}} y {{correctAnswers[1]}}
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
// Mixins
import activityMixins from './../../mixins/activityMixins.js'

export default {
  name: 'LenguajeFacilComponent',
  components: {
    ActivityHeader,
    Instructions
  },
  mixins: [activityMixins],
  data: function () {
    return {
      answers: [],
      isStarted: false,
      module: 'lenguaje',
      level: 'medio',
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
      return _.split(this.activities[this.activityIndex].field_pregunta[0].value, '*')
    },
    correctAnswers: function () {
      return _.split(this.activities[this.activityIndex].field_respuesta[0].value, ', ')
    },
    allActivityAnswers: function () {
      var answersCollection = []

      for (let i = 0; i < this.activities.length; i++) {
        let activityAnswers = _.split(this.activities[i].field_respuesta[0].value, ', ')
        answersCollection.push(activityAnswers)
      }

      return _.shuffle(_.flatten(answersCollection))
    }
  },
  methods: {
    goToNextActivity: function () {
      this.answers = []
      if (this.activityIndex === this.activities.length - 1) {
        this.endActivity()
      } else {
        this.activityIndex++
      }
    },
    makeInvisible: function (values) {
      for (let i = 0; i < values.length; i++) {
        let word = document.getElementById(values[i])
        word.classList.add('crossed')
      }
    },
    checkAnswer: function () {
      this.isAnswerChecked = true
      this.isAnswerEmpty = this.answers.length < 2 || _.includes(this.answers, undefined) || _.includes(this.answers, '')
      if (!this.isAnswerEmpty) {
        if (_.isEqual(this.answers, this.correctAnswers)) {
          this.isAnswerCorrect = true
          this.numberOfCorrectAnswers++
        }
        setTimeout(() => {
          this.makeInvisible(this.correctAnswers)
          this.goToNextActivity()
          var inputs = document.getElementsByClassName('answer')
          inputs[0].focus()
          this.isAnswerChecked = false
          this.isAnswerCorrect = false
          this.isAnswerEmpty = true
        }, 500)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/_variables.scss';
@import './../../assets/scss/_mixins.scss';

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

.question {
  font-family: $text;
  color: $front;
  font-size: 20px;
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
