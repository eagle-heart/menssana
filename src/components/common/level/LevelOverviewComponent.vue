<template>
  <div>
    <!-- Cabecera -->
    <header>
      <router-link class="back-button" to="/" tag="div">
        <i class="material-icons primary">arrow_back</i>
      </router-link>
      <div class="title">
        <h1>menssana</h1>
      </div>
    </header>
    <section>
      <div class="back-link">
        <i class="material-icons primary">keyboard_arrow_left</i>
        <router-link to="/">Inicio</router-link>
      </div>
      <h2 :class="[color, 'module-title']">{{moduleName}}</h2>
    </section>
    <!-- Enlaces a los niveles -->
    <LevelLink :moduleName="moduleName" :textColor="textColor" :borderColor="borderColor" level="facil" levelNumber="I" levelText="Fácil"></LevelLink>
    <LevelLink :moduleName="moduleName" :textColor="textColor" :borderColor="borderColor" level="medio" levelNumber="II" levelText="Medio"></LevelLink>
    <LevelLink :moduleName="moduleName" :textColor="textColor" :borderColor="borderColor" level="dificil" levelNumber="III" levelText="Difícil"></LevelLink>
  </div>
</template>

<script>
// Componentes
import LevelLink from './LevelLinkComponent'

export default {
  name: 'LevelOverview',
  components: {
    LevelLink
  },
  props: ['moduleName', 'color'],
  data: function () {
    return {
      levelCompleted: false // TODO: sustituir por valor en store
    }
  },
  computed: {
    textColor: function () {
      return 'text-' + this.color
    },
    borderColor: function () {
      return 'border-' + this.color
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/_variables.scss';
@import './../../../assets/scss/_mixins.scss';

header,
section {
  @include column-container(50px);
  margin: 10% 0;
}

.back-button,
.back-link {
  @include column-left;
}

.title,
.module-title {
  @include column-center;
}

.primary,
.back-link > a {
  color: $primary;
}

.back-button > i {
  font-size: 24px;
}

h1 {
  font-size: 32 px;
  margin: 0;
}

.back-link > a {
  text-decoration: underline;
  font-size: 18px;
}

.module-title {
  font-family: $brand;
  font-size: 36px;
}

.module-title {
  margin: 0;
}

.back-link {
  visibility: hidden;
}

h2 {
  color: $front;
  font-size: 20px;
}

@media (min-width: 768px) {
  #level {
    width: 70%;
    margin: 0 auto;
  }

  h1 {
    font-size: 48px;
  }

  header,
  section {
    @include column-container(50px);
    margin: 5% 0;
  }

  .back-button {
    visibility: hidden;
  }

  .back-link {
    visibility: visible;
  }
}
</style>
