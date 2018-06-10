<template>
  <div class="box">
    <router-link :to="area" tag="div">
      <img :alt="title" class="box-image" :src="imageUrl"/>
      <div :class="['tile', color]">
        <div class="tile-text">{{title}}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Box',
  props: ['title', 'area', 'color'],
  computed: {
    imageUrl () {
      return require('../../assets/img/' + this.area + '.jpg')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/_variables.scss';

.box {
  position: relative;
  width: 70%;
  margin: 20% auto;
  opacity: 0.9;
  transition-duration: 0.5s;
  box-shadow: 0 0 10px $front;
}

.box-image {
  display: block;
  width: 100%;
}

.box:hover {
  opacity: 1;
  cursor: pointer;
}

.tile {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  margin: 0;
  text-align: center;
  width: 90%;
  height: 18%;
  z-index: 999;
  font-size: 1em;
}

.tile-text {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: $background;
  font-size: 20px;
}

.primary {
  background-color: $primary;
}

.secondary {
  background-color: $secondary;
}

.tertiary {
  background-color: $tertiary;
}

@media (min-width: 768px) {
  .box {
    float: left;
    margin: 4% 9.5% 0 0;
    width: 27%;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
