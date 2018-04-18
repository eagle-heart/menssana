// Servicios
import ActivityService from './../services/ActivityService'
const activityService = new ActivityService()

var activityMixins = {
  methods: {
    startActivity: function () {
      activityService.get(this.module, this.level)
        .then(response => {
          console.log(response.data)
          this.activities = response.data
        })
        .catch(e => {
          console.log(e)
        })
      this.isStarted = true
    },
    endActivity: function () {
      this.isEnded = true
      if (this.numberOfCorrectAnswers === this.activities.length) {
        this.areAllAnswersCorrect = true
      }
    },
    resetActivity: function () {
      this.isStarted = false
      Object.assign(this.$data, this.$options.data())
    }
  }
}

export default activityMixins
