<template>
  <Loading v-if="loading" color />
  <div v-else class="restaurant">
    <h2 class="title">
      <span>{{citation}}</span>
      <a :href="restaurant.url" target="_blank" class="title--link">
        {{ restaurant.name }}
      </a>
    </h2>
    <div class="restaurant__info">
      <div class="restaurant__details">
        <!-- Cuisines -->
        <div class="restaurant__detail">
          <h3 class="title--detail">Kuchyně:</h3>
          <div v-for="(emoji, index) in parseCuisine" :key="index" class="restaurant__cuisine-emoji">
            <p class="restaurant__cuisine-emoji-item">{{ emoji }}</p>
          </div>
        </div>
        <!-- Price range -->
        <div class="restaurant__detail">
          <h3 class="title--detail">Cena:</h3>
          <span>{{ parsePrice }}</span>
        </div>
        <!-- Take Away -->
        <div class="restaurant__detail">
          <h3 class="title--detail">Jídlo s sebou:</h3>
          <span
            v-if="hasTakeAway(restaurant.highlights)"
            >👍
          </span>
          <span v-else>👎</span>
        </div>
        <!-- Credit Card -->
        <div class="restaurant__detail">
          <h3 class="title--detail">Platba kartou:</h3>
          <span
            v-if="hasCreditCard(restaurant.highlights)"
            >👍
          </span>
          <span v-else>👎</span>
        </div>
      </div>
      <div class="restaurant__menu">
        <!-- Daily Menu -->
        <DailyMenu v-if="isDailyMenu" :dishes="dailyMenuDishes" />
        <Loading v-else color />
      </div>
    </div>
    <div class="restaurants__buttons">
      <button @click="refreshDailyMenu" class="restaurants__button--refresh">Chci další!</button>
      <button @click="showLocationMap" class="restaurants__button--location">Kde to je?</button>
      <nuxt-link to="/add-menu" class="button-link button-link--center restaurants__button--restaurant">Přidat denní menu</nuxt-link>
    </div>
  </div>
</template>

<script>
import DailyMenu from '~/components/DailyMenu'
import Loading from '~/components/Loading'
import { mapGetters, mapActions, mapMutations } from 'vuex'

import { emojiParse } from '../middleware/emojiParse'
import { getCitation } from '../static/citations'

export default {
  components: {
    DailyMenu,
    Loading
  },
  data() {
    return {
      loading: false,
      citation: null,
      hasMenu: false,
      starSize: 16
    }
  },
  // Load nearby restaurants by location and get a random restaurant with the daily menu
  async created() {
    try {
      this.loading = true
      await this.getNearbyRestaurants()
      await this.refreshDailyMenu()
    } catch (e) {
      console.log(e)
    }
  },
  computed: {
    ...mapGetters({
      dailyMenuDishes: 'restaurants/getDailyMenuDishes',
      isDailyMenu: 'restaurants/getDailyMenuStatus',
      restaurant: 'restaurants/getCurrentRestaurant',
      showLocation: 'currentRestaurant/getShowLocation'
    }),
    parsePrice() {
      return "💸".repeat(this.restaurant.price_range)
    },
    parseCuisine() {
      return emojiParse(this.restaurant.cuisines)
    },
    parseRating() {
      return this.restaurant.user_rating.aggregate_rating * 100 / 5
    }
  },
  methods: {
    ...mapMutations({setShowLocation: 'currentRestaurant/setShowLocation'}),
    ...mapActions({
      getNearbyRestaurants: 'restaurants/getNearbyRestaurants',
      getRandomRestaurant: 'restaurants/getRandomRestaurant',
      getDailyMenu: 'restaurants/getDailyMenu'
    }),
    hasCreditCard(highlights) {
      return highlights.includes("Credit Card");
    },
    hasTakeAway(highlights) {
      return highlights.includes("Takeaway Available");
    },
    hasPetFriendly(highlights) {
      return highlights.includes("Pet Friendly");
    },
    async refreshDailyMenu() {
      try {
        this.loading = true
        this.closeLocationMap()
        this.citation = getCitation()
        while(!this.hasMenu) {
          await this.getRandomRestaurant()
          await this.getDailyMenu()
          this.hasMenu = await this.isDailyMenu
        }
        this.loading = false
        this.hasMenu = false
      } catch (e) {
        console.log(e)
      }
    },
    showLocationMap() {
      this.setShowLocation(!this.showLocation)
    },
    closeLocationMap() {
      this.setShowLocation(false)
    }
  }
}
</script>

<style lang="scss">
.restaurant {
  display: flex;
  flex-flow: column;
  padding: 64px 40px 0;

  @media screen and (max-width: $tablet) {
    padding: 20px;
    height: 100%;
  }
}
.restaurant__title {
  color: $color-black;
  font-size: 3.75rem;
  line-height: 1.1;
  margin: 0;
  margin-right: 20px;
  font-style: italic;
  font-weight: bold;
  text-transform: uppercase;

  &--link {
    color: $color-violet;
    -webkit-background-clip: text;
    text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
    background-color: $color-violet;
    background-image: linear-gradient(to right,$color-violet 0%,$color-violet 30%,$color-pink 70%,$color-pink 100%);
  }

  @media screen and (max-width: $tablet) {
    font-size: 2rem;
    margin: 0;
  }
}
.restaurant__info {
  display: flex;
  height: 300px;
  @media screen and (max-width: $tablet) {
    flex-flow: column;
    height: auto;
  }
}
.restaurant__details {
  width: 270px;
  @media screen and (max-width: $tablet) {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }
}
.restaurant__detail {
  display: flex;
  align-items: center;
  margin-top: 30px;
  @media screen and (max-width: $tablet) {
    min-width: 50%;
    margin-top: 20px;
  }
}
.title--detail {
  margin-right: 8px;
}
.restaurant__cuisine-emoji {
  display: flex;
}
.restaurant__menu {
  width: 500px;
  margin: 30px;
  @media screen and (max-width: $tablet) {
    width: 100%;
    margin: 20px 0;
  }
}
.restaurants__buttons {
  display: flex;
  margin-top: 10px;
  @media screen and (max-width: $tablet) {
    flex-flow: column;
  }
}
.restaurants__button--refresh {
  background-color: $color-red;
  &::before {
    content: "\01F504";
    position: relative;
    left: 0;
    font-size: 36px;
    z-index: 1;
    transition: 0.2s;
    font-style: initial;
    top: -15px;
    margin-right: 8px;
    line-height: 40px;
  }
  &:hover {
    &::before {
      transform: rotate(180deg);
    }
  }
}
.restaurants__button--location {
  background-color: $color-blue;
  &::before {
    content: "\01F4CD";
    position: relative;
    left: 0;
    top: -15px;
    font-size: 40px;
    z-index: 1;
    transition: 0.2s;
    font-style: initial;
  }
  &:hover {
    &::before {
    transform: scale(1.2);
    }
  }
}
</style>