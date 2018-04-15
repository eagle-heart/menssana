<template>
  <header>
    <div class="back-link">
      <i class="material-icons text-primary">keyboard_arrow_left</i>
      <router-link :to="backRoute">{{moduleNameCapitalized}}</router-link>
    </div>
    <router-link to="/" class="title" tag="div">
      <h1>menssana</h1>
    </router-link>
  </header>
</template>

<script>
// Librerías
import _ from 'lodash'
export default {
  name: 'ActivityHeader',
  props: ['moduleName'],
  computed: {
    backRoute: function () {
      return '/' + this.moduleName
    },
    moduleNameCapitalized: function () {
      return _.capitalize(this.moduleName)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/_variables.scss';
@import './../../../assets/scss/_mixins.scss';
@import './../../../assets/scss/_partials.scss';

header {
  @include column-container(50px);
  margin: 10% 0;
}

.title {
  @include column-right;
  cursor: pointer;
}

.title > h1 {
  font-family: $brand;
  font-size: 32px;
  margin: 0;
}

.back-link {
  @include column-left;
}

.back-link > a {
  color: $primary;
  text-decoration: underline;
  font-size: 18px;
}

@media (min-width: 768px) {
  header {
    margin: 5% 0 2%;
  }
}
</style>
