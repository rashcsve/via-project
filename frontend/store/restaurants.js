export const state = () => ({
  currentCity: 84, // Prague
  currentRestaurant: null,
  restaurants: [],
  dailyMenuDishes: null,
  isDailyMenu: false,
  offset: 0
});

export const getters = {
  getRestaurants(state) {
    return state.restaurants
  },
  getRestaurantsCount(state) {
    return state.restaurants.length
  },
  getCurrentRestaurant(state) {
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
  },
  setOffset(state) {
    state.offset += 20
  },
  removeRestaurant(state, payload) {
    state.restaurants = state.restaurants.filter(res => {
      return res.restaurant.id !== payload
    })
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
      commit('setDailyMenuStatus', false)
      commit('removeRestaurant', state.currentRestaurant.id)
    }
    // Set daily menu if it exists
    if (data && data.status === "success" && data.daily_menus.length !== 0) {
      commit('setDailyMenuStatus', true)
      commit('setDailyMenu', data.daily_menus[0].daily_menu.dishes)
    } else {
      commit('setDailyMenuStatus', false)
      commit('removeRestaurant', state.currentRestaurant.id)
    }
  },
  setDishes({commit}, dishes) {
    if (dishes.length > 0 && (dishes[0].price && dishes[0].name)) {
      commit('setDailyMenuStatus', true)
      commit('setDailyMenu', dishes)
    }
  },
  async getRandomRestaurant({ commit, state }, readLocalStorage) {
      try {
        const restaurantId = localStorage.getItem("restaurant");
        if (restaurantId && readLocalStorage) {
          const dbRestaurant = await this.$axios.$get(`http://0.0.0.0:5000/id/${restaurantId}`);
          return commit('setCurrentResturant', dbRestaurant);
        } else if (state.restaurants.length > 0) {
          const randomRestaurant = state.restaurants[Math.floor(Math.random() * state.restaurants.length)];
          if (randomRestaurant) {
            return commit('setCurrentResturant', randomRestaurant.restaurant);
          }
        } else {
          console.log("No restaurants found")
        }
      } catch(e) {
        console.log(e)
      }
  },
  async getNearbyRestaurants({ state, commit, rootGetters }) {
    const location = rootGetters['location/getLocation']
    const geocode = await this.$axios.$get('geocode', {
      params: {
        lat: location.latitude,
        lon: location.longitude
      }
    })
    console.log(state.offset);
    const { data } = await this.$axios.get('search', {
      params: {
        entity_type: geocode.location.entity_type,
        entity_id: geocode.location.entity_id,
        offset: state.offset
      }
    })
    if (data.restaurants.length !== 0) {
      commit('setRestaurants', data.restaurants)
    }
    commit('setOffset');
  }
}