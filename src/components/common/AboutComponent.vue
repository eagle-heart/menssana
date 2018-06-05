<template>
  <div class="about-us">
    <header>
      <router-link class="back-button" to="/" tag="div">
        <i class="material-icons mens-back">arrow_back</i>
      </router-link>
      <div class="title">
        <h1>menssana</h1>
      </div>
    </header>
    <section>
      <div class="back-link">
        <i class="material-icons mens-back">keyboard_arrow_left</i>
        <router-link class="inicio" to="/">Inicio</router-link>
      </div>
      <h2 class="about-title">Sobre nosotros</h2>
    </section>
    <div>
      <img class="about-picture" src="./../../assets/img/about.png">
    </div>
    <p>
      El proyecto Menssana nació en el año 2018 con el objetivo de brindar a sus usarios actividades motivantes e interactivas para entrenar al máximo sus capacidades mentales.
      Cada actividad ha sido especialmente diseñada para prevenir el deterioro cognitivo en adultos mayores y entrenar habilidades tan importantes como el lenguaje, el cálculo o el razonamiento.
      Para más información, puedes contactar con nosotros a través de cualquiera de las vías que ofrecemos a continuación.
    </p>
    <div class="column">
      <h3 class="column-title">Contacto</h3>
      <div><i class="material-icons mens-phone">phone</i>983 00 00 00</div>
      <div><i class="material-icons mens-mail">mail</i>informacion@menssana.com</div>
    </div>
    <div class="column">
      <h3 class="column-title">Dónde estamos</h3>
      <div><i class="material-icons mens-location">location_on</i>C/Acero s/n, Polígono de San Cristóbal 47012 (Valladolid)</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutComponent'
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/_variables.scss';
@import './../../assets/scss/_mixins.scss';

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
.about-title {
  @include column-center;
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

.about-title {
  font-family: $brand;
  font-size: 32px;
  color: $primary;
  margin: 0;
}

.back-link {
  visibility: hidden;
}

.about-picture {
  width: 50%;
}

.column {
  width: 100%;
  padding-bottom: 4%;
}

.column-title {
  font-family: $brand;
  font-size: 22px;
  color: $primary;
}

.column-text {
  font-size: 18px;
}

.mens-phone,
.mens-mail,
.mens-location {
  vertical-align: middle;
  color: $primary;
  padding-right: 4%;
}

.mens-back,
.inicio {
  color: $primary;
}

@media (min-width: 768px) {
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

  .about-picture {
    width: 30%;
  }

  .column {
    width: 50%;
    float: left;
  }
}
</style>
