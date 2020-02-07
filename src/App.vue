<template lang="pug">
  .wrapper
    header
      .navbar
        .container
          .navbar-content
            router-link.header-logo(
              to="/"
            ) Film Library
            .button-burger(
              @click="menuShow = !menuShow"
              :class="{ active: menuShow }"
            )
              span.line.line-1
              span.line.line-2
              span.line.line-3
            .navbar-list__wrapper(
              :class="{ active: menuShow }"
            )
              ul.navbar-list
                li.navbar-item(
                  v-for="link in linkMenu"
                  :key="link.title"
                  @click="menuShow = false"
                )
                  router-link.navbar-link.button.hover-shadow(
                    :to="`${link.url}`"
                  )  {{ link.title }}
    router-view
</template>

<script>
export default {
  data () {
    return {
      menuShow: false,
      linkMenu: [
        { title: 'Home', url: '/' },
        { title: 'Task', url: '/task' },
        { title: 'Login', url: '/login' },
        { title: 'Registration', url: '/registration' }
      ]
    }
  }
}

</script>

<style lang="scss">
  body {
    background: linear-gradient(45deg, rgb(19, 73, 95), rgb(118, 75, 226), rgb(131, 115, 198), rgb(119, 211, 185)) fixed;
  }
  input[type=text],
  textarea,
  input[type=number] {
    color: #fff;
    border: 2px solid #fff;
  }
  label {
    color: #fff;
  }
  input::placeholder {
    color: #fff;
  }
  .navbar {
    border-bottom: 0;
    .navbar-item {
      transition: all 150ms linear;
      .button {
        color: #333333;
        &:hover {
          opacity: 1;
          color: #8373c6;
        }
      }
    }
  }

  @keyframes hover {
    50% {
      transform: translateY(-3px);
    }

    100% {
      transform: translateY(-6px);
    }
  }

  @keyframes hover-shadow {
    0% {
      transform: translateY(6px);
      opacity: .4;
    }

    50% {
      transform: translateY(3px);
      opacity: 1;
    }

    100% {
      transform: translateY(6px);
      opacity: .4;
    }
  }

  .hover-shadow {
    display: inline-block;
    position: relative;
    transition-duration: 150ms;
    transition-property: transform;

    &:before {
      pointer-events: none;
      position: absolute;
      z-index: -1;
      content: '';
      top: 100%;
      left: 13px;
      height: 10px;
      width: 90%;
      opacity: 0;
      background: radial-gradient(ellipse at center, rgba(0, 0, 0, .35) 0%, rgba(0, 0, 0, 0) 80%); /* W3C */
      transition-duration: 150ms;
      transition-property:  opacity;
    }

    &:hover {
      transform: translateY(-6px);
      animation-name: hover;
      animation-duration: 1.5s;
      animation-delay: 150ms;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-direction: alternate;

      &:before {
        opacity: .4;
        transform: translateY(6px);
        animation-name: hover-shadow;
        animation-duration: 1.5s;
        animation-delay: .3s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-direction: alternate;
      }
    }
  }

  @import "./assets/style/uinimi.min.css";
</style>
