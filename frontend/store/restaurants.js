export const state = () => ({
  restaurants: [],
  currentRestaurant: null
});

export const getters = {
  getRestaurants(state) {
    return state.restaurants
  },
  getRestaurant(state) {
    return state.currentRestaurant
  }
}

export const mutations = {
  setRestaurants(state, payload) {
    state.restaurants = payload
  },
  setRestaurant(state, payload) {
    state.currentRestaurant = payload
  }
}

export const actions = {
  async getRestaurants({commit}) {
    const data = await this.$axios.$get('restaurants')
    commit('setRestaurants', data)
  },
  async getRestaurant({commit}, id) {
    const data = await this.$axios.$get(`id/${id}`)
    commit('setRestaurant', data)
  }
}
