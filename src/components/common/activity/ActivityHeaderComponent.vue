<template>
  <header>
    <div class="back-link">
      <i :class="[textColor, 'material-icons']">keyboard_arrow_left</i>
      <router-link :class="textColor" :to="backRoute">{{moduleTitle}}</router-link>
    </div>
    <router-link to="/" class="title" tag="div">
      <h1 :class="textColor">menssana</h1>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'ActivityHeader',
  props: ['color', 'moduleName', 'moduleTitle'],
  computed: {
    backRoute: function () {
      return '/' + this.moduleName
    },
    textColor: function () {
      return 'text-' + this.color
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
  text-decoration: underline;
  font-size: 18px;
}

@media (min-width: 768px) {
  header {
    margin: 5% 0 2%;
  }
}
</style>
