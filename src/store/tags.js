export default {
  state: {
    tags: [
      {
        title: 'Fantasy',
        use: false
      },
      {
        title: 'Drama',
        use: false
      },
      {
        title: 'Action',
        use: false
      }
    ]
  },
  mutations: {
    newTag (state, payload) {
      state.tags.push(payload)
    }
  },
  actions: {
    newTag ({ commit }, payload) {
      commit('newTag', payload)
    }
  },
  getters: {
    tags (state) {
      return state.tags
    }
  }
}
