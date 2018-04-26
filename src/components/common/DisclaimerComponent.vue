<template>
  <div class="disclaimer">
    Fuente: Cuaderno de ejercicios físicos y actividades de agilidad mental para personas mayores. Cruz Roja Española en Zaragoza, Departamento de Intervención Social, Programa de Personas Mayores, 2012
  </div>
</template>

<script>
export default {
  name: 'Disclaimer'
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/_variables.scss';

.disclaimer {
  color: $front;
  padding: 10% 4% 0;
  font-size: 14px;
  clear: both;
  max-height: 1000000px; // Prevenir font-boosting en dispositivos móviles
}

@media (min-width: 768px) {
  h1 {
    margin-top: 10%;
  }
}
</style>
