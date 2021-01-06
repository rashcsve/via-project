export const state = () => ({
  location: {
    latitude: null,
    longitude: null
  }
});

export const getters = {
  getLocation(state) {
    return state.location
  }
}

export const mutations = {
  setLocation(state, payload) {
    state.location.latitude = payload.latitude;
    state.location.longitude = payload.longitude;
  }
}

export const actions = {
  async getLocation({commit}, address) {
    const data = await this.$axios.$get(`geolocation/${address}`)
    return data
  }
}
