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
                  @click="menuShow = !menuShow"
                )
                  router-link.navbar-link(
                    :to="`${link.url}`"
                  )  {{ link.title }}
    .content-wrapper
</template>

<script>
export default {
  data () {
    return {
      menuShow: false,
      linkMenu: [
        { title: 'Home', url: '/' },
        { title: 'Login', url: '/login' },
        { title: 'Registration', url: '/registration' },
        { title: 'About Us', url: '/aboutUs' }
      ]
    }
  }
}

</script>

<style lang="scss">
  @import "./assets/style/uinimi.min.css";
</style>
