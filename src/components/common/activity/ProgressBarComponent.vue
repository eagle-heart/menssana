<template>
  <div class="progress-container">
    <div :class="[textColor, 'level']">{{levelName}}</div>
    <div class="progress-description">
      <span :class="[textColor, 'full-question-text']">Pregunta {{questionIndex + 1}} de {{numberOfQuestions}}</span>
      <span :class="[textColor, 'short-question-text']">{{questionIndex + 1}} / {{numberOfQuestions}}</span>
      <progress :class="progressColor" :value="questionIndex + 1" :max="numberOfQuestions"></progress>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBarComponent',
  props: ['color', 'levelName', 'numberOfQuestions', 'questionIndex'],
  computed: {
    textColor: function () {
      return 'text-' + this.color
    },
    progressColor: function () {
      return 'progress-' + this.color
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/_variables.scss';
@import './../../../assets/scss/_partials.scss';

.progress-container {
  width: 100%;
  clear: both;
  height: 25px;
  margin: 10% 0;
}

.full-question-text {
  display: none;
}

.level {
  float: left;
}

.progress-description {
  float: right;
}

progress {
  width: 100px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2) inset;
  background: $background;
  border-radius: 14px;
  &.progress-primary::-moz-progress-bar {
    border-radius: 14px;
    background: $primary;
  }
  &.progress-secondary::-moz-progress-bar {
    border-radius: 14px;
    background: $secondary;
  }
  &.progress-tertiary::-moz-progress-bar {
    border-radius: 14px;
    background: $tertiary;
  }
  &::-webkit-progress-bar {
    background: transparent;
  }
  &.progress-primary::-webkit-progress-value {
    border-radius: 14px;
    background: $primary;
  }
  &.progress-secondary::-webkit-progress-value {
    border-radius: 14px;
    background: $secondary;
  }
  &.progress-tertiary::-webkit-progress-value {
    border-radius: 14px;
    background: $tertiary;
  }
}

@media (min-width: 479px) {
  .progress-container {
    margin: 4% 0;
  }
}

@media (min-width: 768px) {
  .short-question-text {
    display: none;
  }
  .level {
    display: none;
  }
  .full-question-text {
    display: inline;
    padding-right: 4%;
  }
  progress {
    width: 200px;
  }
  .progress-description {
    float: none;
  }
}
</style>
