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
