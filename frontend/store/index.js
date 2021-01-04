export const actions = {
  async nuxtServerInit({ commit, state }) {
    const data = await this.$axios.$get('restaurants')
    console.log(data)
    commit('restaurants/setRestaurants', data)
  }
}
