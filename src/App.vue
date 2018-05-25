<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Cabin|Open+Sans');
@import './assets/scss/_variables.scss';
@import './assets/scss/_partials.scss';

html {
  background-color: $background;
}

#app {
  width: 95%;
  margin: 0 auto 12% auto;
  color: $front;
  font-family: $text;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

h1 {
  color: $primary;
}

h1, h2 {
  font-weight: normal;
}

@media (min-width: 1024px) {
  #app {
    width: 55%;
    margin: 0 auto;
  }
}
</style>
