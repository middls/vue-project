import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Task from '../components/Task'
import Registration from '../components/Auth/Registration'
import Login from '../components/Auth/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/task',
      name: 'task',
      component: Task
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
