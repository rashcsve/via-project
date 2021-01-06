<template>
  <client-only>
    <div class="container">
      <div class="container__inner container__index">
        <h2 class="title title--added">Denní Menu v Praze</h2>
        <h3 class="date">{{ getDate }}</h3>
        <div class="restaurants__buttons restaurants__buttons--index">
          <nuxt-link to="/add-menu" class="button-link button-link--center restaurants__button--restaurant">Přidat denní menu</nuxt-link>
        </div>
        <Loading v-if="gettingRestaurants" color />
        <p v-if="error" class="date">{{ error }}</p>
        <restaurant-box v-else v-for="(rest, i) in restaurants" :key="i" :data="rest" />
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import RestaurantBox from '~/components/RestaurantBox'
import Loading from '~/components/Loading'

export default {
  components: {
    RestaurantBox,
    Loading
  },
  data(){
    return {
      gettingRestaurants: false,
      restaurants: null,
      error: null
    }
  },
  async created() {
    try {
      this.gettingRestaurants = true
      await this.loadRestaurants()
      this.restaurants = await this.getRestaurants
      this.restaurants = JSON.parse(this.restaurants)
      this.gettingRestaurants = false
    } catch (e) {
      console.log(e)
      this.gettingRestaurants = false
      this.error = "Nemůžu najít žádné menu. Hm, zkus později"
    }
  },
  computed: {
    ...mapGetters({
      getRestaurants: 'restaurants/getRestaurants'
    }),
    getDate() {
      return new Date().toLocaleDateString()
    }
  },
  methods: {
    ...mapActions({
      loadRestaurants: 'restaurants/getRestaurants'
    })
  }
}
</script>

<style lang="scss">
.date {
  margin-bottom: 24px;
  margin-top: 0;
}
</style>
