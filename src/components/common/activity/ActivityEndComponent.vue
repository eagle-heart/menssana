<template>
  <div class="end">
    <!-- Todas las respuestas son correctas -->
    <div v-if="allCorrect">
      <h4 :class="textColor">
        <i class="material-icons mens-stars">stars</i>
        ¡Enhorabuena!
      </h4>
      <p :class="textColor">Todas tus respuestas son correctas</p>
    </div>
     <!-- No se han acertado todas las respuestas -->
    <div v-else>
      <h4 :class="textColor">¡Terminamos!</h4>
      <p :class="textColor">Has acertado {{correctAnswers}} preguntas de {{numberOfQuestions}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityEndComponent',
  props: ['allCorrect', 'color', 'correctAnswers', 'numberOfQuestions'],
  computed: {
    textColor: function () {
      return 'text-' + this.color
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/_variables.scss';

.end {
  height: 350px;
}

.mens-stars {
  vertical-align: middle;
}

.end .mens-stars {
  font-size: 48px;
}

.end h4 {
  font-size: 48px;
  font-family: $brand;
}

.end p {
  font-size: 32px;
}

</style>
