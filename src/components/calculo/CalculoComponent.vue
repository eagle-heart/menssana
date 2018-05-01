<template>
  <div>
    <LevelOverview moduleName="Calculo" moduleTitle="Cálculo" color="secondary"></LevelOverview>
    <Disclaimer></Disclaimer>
  </div>
</template>

<script>
// Componentes
import Disclaimer from './../common/DisclaimerComponent'
import LevelOverview from './../common/level/LevelOverviewComponent'

export default {
  name: 'Calculo',
  components: {
    Disclaimer,
    LevelOverview
  }
}
</script>

<style lang="scss" scoped>
</style>
