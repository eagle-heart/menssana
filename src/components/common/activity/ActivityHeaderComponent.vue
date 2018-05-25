<template>
  <header>
    <!-- Menú hamburguesa (pantallas pequeñas) -->
    <!-- Botón -->
    <div class="menu-column" @click="toggleMenu()">
      <i :class="[textColor, 'material-icons', 'mens-hamburger']">menu</i>
      <div :class="textColor">Menú</div>
    </div>
    <!-- Menú deslizable -->
    <div :class="[showMenu ? 'open' : 'closed', backgroundColor, 'menu']">
      <div class="menu-bar">
        <i class="material-icons" @click="toggleMenu()">close</i>
      </div>
      <router-link :to="backRoute" class="menu-bar" tag="div">
        <i class="material-icons">keyboard_arrow_left</i>
        <span class="menu-bar-text">Volver a {{moduleTitle}}</span>
      </router-link>
      <router-link to="/" class="menu-bar" tag="div">
        <i class="material-icons">home</i>
        <span class="menu-bar-text">Volver a Inicio</span>
      </router-link>
    </div>
    <!-- Menú migas de pan (pantallas grandes) -->
    <div class="breadcrumb">
      <div class="breadcrumb-item">
        <router-link :class="[textColor, 'breadcrumb-text', 'link']" to="/" tag="div">Inicio</router-link>
      </div>
      <div class="breadcrumb-item">
        <i :class="[textColor,'material-icons']">keyboard_arrow_right</i>
        <router-link :class="[textColor, 'breadcrumb-text', 'link']" :to="backRoute" tag="div">{{moduleTitle}}</router-link>
      </div>
      <div class="breadcrumb-item">
        <i :class="[textColor,'material-icons']">keyboard_arrow_right</i>
        <div :class="[textColor, 'breadcrumb-text']">{{ moduleLevel }}</div>
      </div>
    </div>
    <!-- Logo -->
    <router-link to="/" class="title" tag="div">
      <h1 :class="textColor">menssana</h1>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'ActivityHeader',
  props: ['color', 'moduleLevel', 'moduleName', 'moduleTitle'],
  data: function () {
    return {
      showMenu: false
    }
  },
  computed: {
    backRoute: function () {
      return '/' + this.moduleName
    },
    backgroundColor: function () {
      return 'background-' + this.color
    },
    textColor: function () {
      return 'text-' + this.color
    }
  },
  methods: {
    toggleMenu: function () {
      if (this.showMenu) {
        this.showMenu = false
      } else {
        this.showMenu = true
      }
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
}

.title > h1 {
  font-family: $brand;
  font-size: 32px;
  margin: 0;
  cursor: pointer;
}

// Menú hamburguesa
.menu-column {
  @include column-left;
  font-size: 16px;
}

.menu {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1000;
  transition: transform 1s;
  top: 0;
  left: 0;
  &.closed {
    transform: translateX(-100%);
  }
  &.open {
    transform: translateX(0);
  }
}

.mens-hamburger {
  vertical-align: baseline;
  font-size: 24px;
  padding-right: 6%;
}

.menu-bar:first-child {
  justify-content: flex-end;
}

.menu-bar {
  border-bottom: 1px solid $background;
  height: 40px;
  padding: 1.5% 3%;
  color: $background;
  text-align: left;
  display: flex;
  align-items: center;
}

.menu-bar-text {
  padding-left: 6%;
  width: 100%;
}

// Menú migas de pan

.breadcrumb {
  display: none;
}

@media (min-width: 768px) {
  header {
    margin: 5% 0 2%;
  }

  // Menú hamburguesa
  .menu-column {
    display: none;
  }

  // Menú migas de pan
  .breadcrumb {
    @include column-left;
  }
  .breadcrumb-item {
    float: left;
    display: flex;
    align-items: center;
  }
  .breadcrumb-text {
    display: inline-block;
    &.link {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
