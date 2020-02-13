import Vue from 'vue'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import router from './router'
import store from './store'
import User from './store/user'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  User,
  created () {
    var firebaseConfig = {
      apiKey: 'AIzaSyDstrYwsDCTik0NJ5BzplFH-kyN81O9f4E',
      authDomain: 'library-d4b1d.firebaseapp.com',
      databaseURL: 'https://library-d4b1d.firebaseio.com',
      projectId: 'library-d4b1d',
      storageBucket: 'library-d4b1d.appspot.com',
      messagingSenderId: '52908712335',
      appId: '1:52908712335:web:c73fe31eaf9f3089016bfa',
      measurementId: 'G-DYRJ1Q77ZL'
    }
    firebase.initializeApp(firebaseConfig)

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('loggedUser', user)
      }
      this.$store.dispatch('loadTasks')
    })
  }
}).$mount('#app')
