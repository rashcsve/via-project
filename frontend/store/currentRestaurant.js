export const state = () => ({
  currentCity: 84, // Prague
  currentRestaurant: null,
  showLocation: false
});

export const getters = {
  getCurrentRestaurant(state) {
    return state.currentRestaurant
  },
  getCurrentCity(state) {
    return state.currentCity
  },
  getShowLocation(state) {
    return state.showLocation
  }
}

export const mutations = {
  setCurrentRestaurant(state, payload) {
    state.currentRestaurant = payload
  },
  setShowLocation(state, payload) {
    state.showLocation = payload
  }
}