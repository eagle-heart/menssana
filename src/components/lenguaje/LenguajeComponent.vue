<template>
  <div>
    <LevelOverview moduleName="Lenguaje" color="primary"></LevelOverview>
    <Disclaimer></Disclaimer>
  </div>
</template>

<script>
// Componentes
import Disclaimer from './../common/DisclaimerComponent'
import LevelOverview from './../common/level/LevelOverviewComponent'

export default {
  name: 'Lenguaje',
  components: {
    Disclaimer,
    LevelOverview
  }
}
</script>

<style lang="scss" scoped>
</style>
