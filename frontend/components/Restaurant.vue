<template>
  <Loading v-if="loading" color />
  <div v-else-if="!loading && !error" class="restaurant">
    <h2 class="title">
      <span>{{ citation }}</span>
      <a v-if="restaurant.restaurant && restaurant.restaurant.url" :href="restaurant.restaurant.url" target="_blank" class="title--link">
        {{ restaurant.restaurant.name }}
      </a>
      <p class="title--link" v-else>{{ restaurant.name }}</p>
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
            v-if="takeAway"
            >👍
          </span>
          <span v-else>👎</span>
        </div>
        <!-- Credit Card -->
        <div class="restaurant__detail">
          <h3 class="title--detail">Platba kartou:</h3>
          <span
            v-if="creditCard"
            >👍
          </span>
          <span v-else>👎</span>
        </div>
      </div>
      <div class="restaurant__menu">
        <DailyMenu :dishes="dailyMenuDishes" />
      </div>
    </div>
    <div class="restaurants__buttons">
      <button @click="showLocationMap" class="restaurants__button--location">Kde to je?</button>
      <nuxt-link to="/" class="button-link restaurants__button--refresh">Vrátit se na domovskou stránku!</nuxt-link>
    </div>
  </div>
  <div v-else-if="error" class="title--added">
    {{ error }}
  </div>
</template>

<script>
import DailyMenu from '~/components/DailyMenu'
import Loading from '~/components/Loading'
import { mapGetters, mapMutations } from 'vuex'

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
      error: false,
      restaurant: null
    }
  },
  async created() {
    try {
      this.loading = true
      this.citation = getCitation()
      const id = this.$route.params.slug
      await this.$store.dispatch('restaurants/getRestaurant', id)
      this.restaurant = await this.getCurrentRestaurant
      this.restaurant = JSON.parse(this.restaurant)
      this.loading = false
    } catch (e) {
      console.log(e)
      this.loading = false
      this.error = "Nejde načíst restauraci :("
    }
  },
  computed: {
    ...mapGetters({
      showLocation: 'currentRestaurant/getShowLocation',
      getCurrentRestaurant: 'restaurants/getRestaurant'
    }),
    parsePrice() {
      if (this.isCustom) {
        return "💸".repeat(this.restaurant.price_range)
      } else {
        return "💸".repeat(this.restaurant.restaurant.price_range)
      }
    },
    parseCuisine() {
      if (this.isCustom) {
        return emojiParse(this.restaurant.cuisines)
      } else {
        return emojiParse(this.restaurant.restaurant.cuisines)
      }
    },
    dailyMenuDishes() {
      if (this.restaurant.custom) {
        return this.restaurant.dishes
      } else {
        return this.restaurant.daily_menus[0].daily_menu.dishes
      }
    },
    isCustom() {
      return this.restaurant.custom
    },
    creditCard() {
      if (this.isCustom) {
        return this.hasCreditCard(this.restaurant.highlights)
      } else {
        return this.hasCreditCard(this.restaurant.restaurant.highlights)
      }
    },
    takeAway() {
      if (this.isCustom) {
        return this.hasTakeAway(this.restaurant.highlights)
      } else {
        return this.hasTakeAway(this.restaurant.restaurant.highlights)
      }
    }
  },
  methods: {
    ...mapMutations({setShowLocation: 'currentRestaurant/setShowLocation'}),
    hasCreditCard(highlights) {
      return highlights.includes("Credit Card");
    },
    hasTakeAway(highlights) {
      return highlights.includes("Takeaway Available");
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
  width: 800px;
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
