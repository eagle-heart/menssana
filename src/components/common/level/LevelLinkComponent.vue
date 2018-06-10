<template>
  <router-link :to="levelRoute" tag="div" class="level-link">
    <div :class="[borderColor, 'level-box']">
      <!-- Icono de nivel completado -->
      <div :class="['completed', levelCompleted ? 'visible' : 'invisible']">
        <i class="material-icons mens-check-circle">check_circle</i>
        <span class="completed-text">¡Completado!</span>
      </div>
      <!-- Nombre de nivel -->
      <div class="level-name">
        <h3 :class="textColor">Nivel {{levelNumber}}</h3>
        <span>{{levelText}}</span>
      </div>
      <!-- Flecha -->
      <div class="arrow">
        <i :class="['material-icons', 'mens-arrow-right', textColor]">keyboard_arrow_right</i>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'LevelLink',
  props: ['moduleName', 'textColor', 'borderColor', 'level', 'levelNumber', 'levelText'],
  computed: {
    levelRoute: function () {
      return '/' + this.moduleName + '/' + this.level
    },
    levelCompleted: function () {
      var state = 'completedLevel' + this.moduleName
      return this.$store.state[state][this.level] // comprobamos si el nivel está completado
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/_variables.scss';
@import './../../../assets/scss/_mixins.scss';

.level-link {
  cursor: pointer;
}

.visible {
  visibility: visible;
}

.invisible {
  visibility: hidden;
}

.mens-arrow-right,
.mens-check-circle {
  font-size: 38px;
}

.mens-check-circle {
  color: $success;
}

.completed {
  @include column-left;
}

.level-name {
  @include column-center;
}

.arrow {
  @include column-right;
}

.completed-text {
  display: none;
}

.level-box {
  border-width: 1.5px;
  border-style: solid;
  border-radius: 10px;
  padding: 3%;
  @include column-container(62px);
  margin-bottom: 3%;
}

.level-name {
  display: inline-block;
}

.level-name > h3 {
  margin: 0;
  font-size: 28px;
  font-family: 'Cabin', sans-serif;
}

.level-name > span {
  font-size: 20px;
}

@media (min-width: 768px) {
  h1 {
    margin-top: 5%;
  }

  .level-box {
    padding: 2%;
  }

  .completed-text {
    display: inline-block;
    margin-left: 15px;
    color: $success;
  }

  .mens-arrow-right,
  .mens-check-circle {
    font-size: 48px;
  }
}
</style>
