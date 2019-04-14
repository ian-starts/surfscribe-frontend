export const state = () => ({
  locations: [],
  isLoading: false,
  error: null,
})

export const mutations = {
  add (state, text) {
    state.list.push({
      text: text,
      done: false
    })
  },
  remove (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle (state, todo) {
    todo.done = !todo.done
  },
  requestLocations (state) {
    state.isLoading = true
  },
  receiveLocationsSuccess (state, { data }) {
    state.isLoading = false
    state.locations = data
  },
  receiveLocationsError (state, { error }) {
    state.isLoading = false
    state.error = error
  },
}

export const actions = {
  getLocations ({ commit }) {
    commit('requestLocations')
    return this.$axios.$get('api/locations?embeds[]=images')
      .then(({ data }) => commit('receiveLocationsSuccess', { data }))
      .catch(error => (console.error(error), commit('receiveLocationsError', { error })))
  }
}