<template>
  <nuxt-link :to="'/restaurant/' + data._id" class="restaurant-box">
    <!-- <p>{{ data }}</p> -->
    <div class="restaurant-box__left">
      <div class="restaurant-box__name">
        <h3>{{ getName }}</h3>
        <div v-for="(emoji, index) in parseCuisine" :key="index" class="restaurant-box__cuisine-emoji">
            <p class="restaurant-box__cuisine-emoji-item">{{ emoji }}</p>
          </div>
      </div>
      <p class="restaurant-box__location">{{ getLocation }}</p>
    </div>
    <div class="restaurant-box__right">
      <p>Více informace</p>
    </div>
  </nuxt-link>
</template>

<script>
import { emojiParse } from '../middleware/emojiParse'
  export default {
    props: {
      data: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      isCustom() {
        return this.data.custom
      },
      getName() {
        if (this.isCustom) {
          return this.data.name
        } else {
          return this.data.restaurant.name
        }
      },
      getLocation() {
        if (this.isCustom) {
          return this.data.location
        } else {
          return this.data.restaurant.location.address
        }
      },
      parseCuisine() {
        let cuisines = []
        if (this.isCustom) {
          cuisines = this.data.cuisines
        } else {
          cuisines = this.data.restaurant.cuisines
        }
        return emojiParse(cuisines)
      }
    }
  }
</script>

<style lang="scss" scoped>
.restaurant-box {
  width: 80%;
  margin: auto;
  box-shadow: 2px 2px 6px 0px rgba(93,54,186,0.54);
  border: 1px solid $color-violet;
  margin-bottom: 8px;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $color-black;

  &:hover {
    background-color: $color-grey;

    .restaurant-box__right {
      color: $color-blue;
    }
  }

  &__right {
    font-weight: bold;
  }

  &__left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__name {
    display: flex;
  }

  &__location {
    margin-top: 8px;
  }

  &__cuisine-emoji {
    display: flex;
  }

  &__cuisine-emoji-item {
    margin-left: 4px;
  }
}
</style>
