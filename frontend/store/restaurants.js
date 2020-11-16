export const state = () => ({
  currentCity: 84, // Prague
  currentRestaurant: null,
  restaurants: [],
  dailyMenuDishes: null,
  isDailyMenu: false
});

export const getters = {
  getRestaurants(state) {
    return state.restaurants
  },
  getRestaurantsCount(state) {
    return state.restaurants.length
  },
  getCurrentRestaurant(state) {
    console.log(state.currentRestaurant);
    return state.currentRestaurant
  },
  getDailyMenuDishes(state) {
    return state.dailyMenuDishes
  },
  getDailyMenuStatus(state) {
    return state.isDailyMenu
  },
  getCurrentCity(state) {
    return state.currentCity
  }
}

export const mutations = {
  setRestaurants(state, payload) {
    state.restaurants = payload
  },
  setNearbyRestaurants(state, payload) {
    state.nearbyRestaurants = payload
  },
  setCurrentResturant(state, payload) {
    state.currentRestaurant = payload
  },
  setDailyMenu(state, payload) {
    state.dailyMenuDishes = payload
  },
  setDailyMenuStatus(state, payload) {
    state.isDailyMenu = payload
  }
}

export const actions = {
  async getRestaurants({ commit, state }) {
    const { data } = await this.$axios.get('search', {
      params: {
        city_id: state.currentCity,
        q: 'Lunch Menu'
      }
    })
    if (data.restaurants.length !== 0) {
      commit('setRestaurants', data.restaurants)
    }
  },
  async getDailyMenu({state, commit}) {
    let data = {
      daily_menus: [] 
    }
    try {
      data = await this.$axios.$get('dailymenu', {
        params: {
          res_id: state.currentRestaurant.id
        }
      })
    } catch(e) {
      console.log(e)
      commit('setDailyMenuStatus', false)
    }
    console.log(data);
    // Set daily menu if it exists
    if (data && data.status === "success" && data.daily_menus.length !== 0) {
      commit('setDailyMenuStatus', true)
      commit('setDailyMenu', data.daily_menus[0].daily_menu.dishes)
    } else {
      commit('setDailyMenuStatus', false)
    }
  },
  async getRandomRestaurant({ commit, state }) {
    try {
      if (state.restaurants.length > 0) {
        const randomRestaurant = state.restaurants[Math.floor(Math.random() * state.restaurants.length)];
        if (randomRestaurant) {
          return commit('setCurrentResturant', randomRestaurant.restaurant)
        }
      } else {
        console.log("No restaurants found")
      }
    } catch(e) {
      console.log(e)
    }
  },
  async getNearbyRestaurants({ commit, rootGetters }) {
    const location = rootGetters['location/getLocation']
    const geocode = await this.$axios.$get('geocode', {
      params: {
        lat: location.latitude,
        lon: location.longitude
      }
    })
    const { data } = await this.$axios.get('search', {
      params: {
        entity_type: geocode.location.entity_type,
        entity_id: geocode.location.entity_id
      }
    })
    if (data.restaurants.length !== 0) {
      commit('setRestaurants', data.restaurants)
    }
  }
}