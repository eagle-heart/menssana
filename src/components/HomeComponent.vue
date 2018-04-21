<template>
  <div id="home">
    <h1>menssana</h1>
    <h2>Actividades de estimulación cognitiva para personas mayores</h2>
    <div class="box-container">
      <box title="Lenguaje" area="lenguaje" color="primary"></box>
      <box title="Cálculo" area="calculo" color="secondary"></box>
      <box title="Razonamiento" area="razonamiento" color="tertiary"></box>
    </div>
    <Disclaimer></Disclaimer>
  </div>
</template>

<script>
// Componentes
import Box from './common/BoxComponent'
import Disclaimer from './common/DisclaimerComponent'
export default {
  name: 'Home',
  components: {
    Box,
    Disclaimer
  }
}
</script>

<style lang="scss" scoped>
@import './../assets/scss/_variables.scss';

// Títulos
h1 {
  color: $primary;
  font-family: $brand;
  font-size: 48px;
}

h2 {
  color: $front;
  font-size: 20px;
}

.box-container {
  width: 100%;
  clear: both;
}

@media (min-width: 768px) {
  h1 {
    margin-top: 10%;
  }
}
</style>
