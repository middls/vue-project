<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 HOME
        .wrapper-for-input.col-md-5
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
          .tag-list.tag-list--add
            .ui-tag__wrapper(
              @click="tagMenuShow = !tagMenuShow"
            )
              .ui-tag
                span.tagTitle Add New
                span.button-close(
                  :class="{ active: !tagMenuShow }"
                )
          .tag-list.tag-list--menu(
            v-if="tagMenuShow"
          )
            input.tag-add--input(
              type="text"
              placeholder="New tag"
              v-model="tagTitle"
              @keyup.enter="newTag"
            )
            .button.button--round.button-default(
              @click="newTag"
            ) Send
          .tag-list
            .ui-tag__wrapper(
              v-for="tag in tags"
              :key="tag.title"
            )
              .ui-tag(
                @click="addTagUsed(tag)"
                :class="{used: tag.use}"
              )
                span.tag-title {{ tag.title }}
                span.button-close
          p {{ tagsUsed }}
          .button.button--round.button-default(
            @click="newTask"
          ) Send
</template>

<script>
export default {
  data () {
    return {
      taskTitle: '',
      taskDescription: '',
      whatWatch: '',
      // time film
      filmHours: 1,
      filmMinutes: 30,
      // time serial
      serialSeasons: 1,
      serialSeries: 10,
      serialSeriesMinutes: 45,
      // tag
      tagTitle: '',
      tagMenuShow: false,
      tagsUsed: []
    }
  },
  methods: {
    newTag () {
      if (this.tagTitle === '') {
        return {}
      }
      const tag = {
        title: this.tagTitle,
        use: false
      }
      this.$store.dispatch('newTag', tag)
      this.tagTitle = ''
    },
    addTagUsed (tag) {
      tag.use = !tag.use
      if (tag.use) {
        this.tagsUsed.push({
          title: tag.title
        })
      } else {
        this.tagsUsed.splice(tag.title, 1)
      }
    },
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
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        totalTime,
        tags: this.tagsUsed,
        completed: false,
        editing: false
      }
      this.$store.dispatch('newTask', task)
      console.log(task)
      this.taskTitle = ''
      this.taskDescription = ''
      this.tagsUsed = []

      for (let i = 0; i < this.tags.length; i++) {
        this.tags[i].use = false
      }
    },
    getHoursAndMinutes (minutes) {
      let hours = Math.trunc(minutes / 60)
      let min = minutes % 60
      return hours + ' Hours ' + min + ' Minutes'
    }
  },
  computed: {
    tags () {
      return this.$store.getters.tags
    },
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
  .ui-tag {
    color: #fff;
    border: 2px solid #ffffff;

    .button-close:before,
    .button-close:after {
      background-color: #fff;
    }
  }

  .used {
    background-color: blue;
  }

  .ui-tag__wrapper:not(:last-child) {
    margin-right: 10px;
  }

  .ui-tag__wrapper {
    margin-bottom: 15px;
  }

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

  .time-title {
    color: #fff
  }

  p {
    color: #fff;
  }

  .ui-tag {
    .button-close {
      &.active {
        transform: rotate(45deg);
      }
    }
  }

  .tag-list--menu {
    display: flex;
    align-items: center;

    input {
      margin-bottom: 0;
    }

    .button--round {
      margin-left: 10px;
    }
  }

  $md-radio-checked-color: rgb(250, 250, 250);
  $md-radio-border-color: rgba(250, 250, 250);
  $md-radio-size: 20px;
  $md-radio-checked-size: 10px;
  $md-radio-ripple-size: 15px;

  @keyframes ripple {
    0% {
      box-shadow: 0px 0px 0px 1px rgba(250, 250, 250, 0);
    }
    50% {
      box-shadow: 0px 0px 0px $md-radio-ripple-size rgba(250, 250, 250, 0.1);
    }
    100% {
      box-shadow: 0px 0px 0px $md-radio-ripple-size rgba(250, 250, 250, 0);
    }
  }

  .option-list {
    margin: 16px 0;

    input[type="radio"] {
      display: none;

      &:checked + label:before {
        border-color: $md-radio-checked-color;
        animation: ripple 0.5s linear forwards;
      }

      &:checked + label:after {
        transform: scale(1);
      }
    }

    label {
      display: inline-block;
      min-height: $md-radio-size;
      position: relative;
      padding: 0 ($md-radio-size + 10px);
      margin-bottom: 0;
      cursor: pointer;
      vertical-align: bottom;

      &:before, &:after {
        position: absolute;
        content: '';
        border-radius: 50%;
        transition: all .3s ease;
        transition-property: transform, border-color;
      }

      &:before {
        left: 0;
        top: 0;
        width: $md-radio-size;
        height: $md-radio-size;
        border: 2px solid $md-radio-border-color;
      }

      &:after {
        top: $md-radio-size / 2 - $md-radio-checked-size / 2;
        left: $md-radio-size / 2 - $md-radio-checked-size / 2;
        width: $md-radio-checked-size;
        height: $md-radio-checked-size;
        transform: scale(0);
        background: $md-radio-checked-color;
      }
    }
  }
</style>
