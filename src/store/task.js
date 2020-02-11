import firebase from 'firebase/app'
import Task from './task_help'

export default {
  state: {
    tasks: [
      {
        'id': 1,
        'title': 'joker',
        'description': 'about joker',
        'whatWatch': 'Film',
        'completed': false,
        'editing': false
      },
      {
        'id': 2,
        'title': 'The Witcher',
        'description': 'new serial from Netflix',
        'whatWatch': 'Serial',
        'completed': true,
        'editing': false
      }
    ]
  },
  mutations: {
    newTask (state, payload) {
      state.tasks.push(payload)
    }
  },
  actions: {
    async newTask ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const newTask = new Task(
          payload.title,
          payload.description,
          payload.whatWatch,
          payload.totalTime,
          payload.tags,
          payload.completed,
          payload.editing,
          getters.user.id
        )
        const task = await firebase.database().ref('tasks').push(newTask)
        console.log(task)
        commit('newTask', {
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    tasks (state) {
      return state.tasks
    },
    taskCompleted (state) {
      return state.tasks.filter(task => {
        return task.completed
      })
    },
    taskNotCompleted (state) {
      return state.tasks.filter(task => {
        return task.completed === false
      })
    }
  }
}
