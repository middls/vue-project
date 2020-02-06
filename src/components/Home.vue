<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 HOME
        input(
          type='text'
          placeholder='Что будем смотреть?'
          v-model="taskTitle"
          v-on:keyup.enter="newTask"
        )
        textarea(
          type='text'
          v-model="taskDescription"
          v-on:keyup.enter="newTask"
        )
        .option-list
          input.what-watch--radio(
            type='radio'
            id='radioFilm'
            value='Film'
            v-model='whatWatch'
          )
          label(
            for='radioFilm'
          ) Film
          input.what-watch--radio(
            type='radio'
            id='radioSerial'
            value='Serial'
            v-model='whatWatch'
          )
          label(
            for='radioSerial'
          ) Serial
        .total-time
          .total-time__film(
            v-if="whatWatch === 'Film'"
          )
            span.time-title Hours
            input.time-input(
              type='number'
              v-model="filmHours"
            )
            span.time-title Minutes
            input.time-input(
              type='number'
              v-model="filmMinutes"
            )
            p {{ filmTime }}
          .total-time__serial(
            v-if="whatWatch === 'Serial'"
          )
            span.time-title How many seasons?
            input.time-input(
              type='number'
              v-model="serialSeasons"
            )
            span.time-title How many series?
            input.time-input(
              type='number'
              v-model="serialSeries"
            )
            span.time-title How long is one series?
            input.time-input(
              type='number'
              v-model="serialSeriesMinutes"
            )
            p {{ serialTime }}
        .tag-list
          .ui-tag__wrapper
            .ui-tag
              span.tag-title Fantasy
              span.button-close
</template>

<script>
export default {
  data () {
    return {
      taskTitle: '',
      taskId: 3,
      taskDescription: '',
      whatWatch: '',
      // time film
      filmHours: 1,
      filmMinutes: 30,
      // time serial
      serialSeasons: 1,
      serialSeries: 10,
      serialSeriesMinutes: 45
    }
  },
  methods: {
    newTask () {
      if (this.taskTitle === '') {
        return {}
      }
      let totalTime
      if (this.whatWatch === 'Film') {
        totalTime = this.filmTime
      } else {
        totalTime = this.serialTime
      }
      const task = {
        id: this.taskId,
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        totalTime,
        completed: false,
        editing: false
      }
      console.log(task)
      this.taskId += 1
      this.taskTitle = ''
      this.taskDescription = ''
    },
    getHoursAndMinutes (minutes) {
      let hours = Math.trunc(minutes / 60)
      let min = minutes % 60
      return hours + ' Hours ' + min + ' Minutes'
    }
  },
  computed: {
    filmTime () {
      let min = (this.filmHours * 60) + (this.filmMinutes * 1)
      return this.getHoursAndMinutes(min)
    },
    serialTime () {
      let min = (this.serialSeasons * this.serialSeries * this.serialSeriesMinutes)
      return this.getHoursAndMinutes(min)
    }
  }
}
</script>

<style scoped lang="scss">
  .option-list {
    display: flex;
    align-items: center;

    label {
      margin-right: 15px;
      margin-bottom: 0;
    }

    .what-watch--radio {
      margin-right: 7px;
      margin-bottom: 0;
    }
  }

  .total-time {
    margin-top: 15px;
  }

  .tag-list {
    margin-top: 15px;
  }
  .time-title {
    display: block;
    margin-bottom: 6px;
  }
  .time-input {
    max-width: 80px;
    margin-right: 10px;
  }
</style>
