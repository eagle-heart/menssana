<template>
  <div>
    <h2 :class="textColor">Nivel {{levelNumber}} - {{levelName}}</h2>
    <div v-if="loading" :class="['loading', borderColor]"></div>
    <div v-else :class="['instructions-container', borderColor]">
      <p>{{instructionsText}}</p>
      <h3>Ejemplo</h3>
      <button :class="['start', backgroundColor, borderColor]" v-on:click="$emit('start-activity')">Comenzar</button>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
// Servicios
import InstructionsService from './../../../services/InstructionsService'
// Constantes
const instructionsService = new InstructionsService()

export default {
  name: 'Instructions',
  props: ['module', 'level', 'levelName', 'levelNumber', 'color'],
  data: function () {
    return {
      instructionsData: [],
      loading: true
    }
  },
  computed: {
    instructionsText: function () {
      return this.instructionsData[0].field_texto[0].value
    },
    borderColor: function () {
      return 'border-' + this.color
    },
    backgroundColor: function () {
      return 'background-' + this.color
    },
    textColor: function () {
      return 'text-' + this.color
    }
  },
  created () {
    instructionsService.get(this.module, this.level)
      .then(response => {
        this.instructionsData = response.data
        this.loading = false
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/_variables.scss';

.clearfix {
  clear: both;
}

h2 {
  font-family: $brand;
  font-size: 28px;
  padding: 4% 0;
}

.loading {
  height: 60px;
  width: 60px;
  margin: 94px auto 0 auto;
  position: relative;
  -webkit-animation: rotation .6s infinite linear;
  -moz-animation: rotation .6s infinite linear;
  -o-animation: rotation .6s infinite linear;
  animation: rotation .6s infinite linear;
  border-width: 6px;
  border-style: solid;
  border-top-color: $background;
  border-radius: 100%;
}

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
}

@-moz-keyframes rotation {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(359deg);
  }
}

@-o-keyframes rotation {
  from {
    -o-transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(359deg);
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.instructions-container,
.start {
  border-style: solid;
  border-radius: 10px;
  border-width: 1.5px;
}

.instructions-container {
  border-style: solid;
  border-radius: 10px;
  padding: 3%;
}

.start {
  color: $background;
  font-family: $text;
  font-size: 20px;
  padding: 2% 10%;
  cursor: pointer;
}

@media (min-width: 768px) {
  h2 {
    padding: 2% 0;
  }
  .start {
    float: right;
    clear: both;
    padding: 1% 4%;
  }
}
</style>
