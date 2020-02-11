<template lang="pug">
  .content-wrapper
    section
      .container
        .auth
          .auth__banner
            h1.ui-title-2 Log in
          .auth__form
            span.ui-title-2
            form(@submit.prevent="onSubmit")
              .form-item(
                :class="{ errorInput: $v.email.$error }"
              )
                input(
                  type='email'
                  placeholder='Email'
                  v-model='email'
                  :class="{ error: $v.email.$error }"
                  @change="$v.email.$touch()"
                )
                .error(v-if='!$v.email.required') Fields is required
                .error(v-if='!$v.email.email') Email is not correct
              .form-item(
              :class="{ errorInput: $v.password.$error }"
              )
                input(
                  type='password'
                  placeholder='Password'
                  v-model='password'
                  :class="{ error: $v.password.$error }"
                   @change="$v.password.$touch()"
                )
                .error(v-if="!$v.password.required") Password is required.
                .error(v-if="!$v.password.minLength")
                  | Password must have at least {{ $v.password.$params.minLength.min }} letters.
              .buttons-list
                button.buttons.button-primary(
                  type="submit"
                )
                  span(v-if="loading") Loading...
                  span(v-else) LOG In
              .button-list.buttons-list--info
                p.typo__p(v-if="submitStatus === 'OK'") Thanks for your submission!
                p.typo__p(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
                p.typo__p(v-else) {{ submitStatus }}
              .button-list.buttons-list--info
                span Need Registration?
                  router-link(to="/registration")  Enter here!
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      submitStatus: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        console.log('submit!')
        // do your submit logic here
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('loginUser', user)
          .then(() => {
            console.log('LOGIN')
            this.submitStatus = 'OK'
            this.$router.push('/')
          })
          .catch(err => {
            this.submitStatus = err.message
          })
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped lang="scss">
input {
  &.error {
    border-color: #fc5c65;
   }
}
.form-item {
  .error {
    display: none;
    margin-bottom: 8px;
    font-size: 14px;
  }
  &.errorInput {
    .error {
      display: block;
    }
  }
}
</style>
