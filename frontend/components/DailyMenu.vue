<template>
  <section class="daily-menu">
    <h3>Denní menu 🧾:</h3>
    <div v-for="(dish, i) in dishes" :key="i" class="daily-menu__dishes">
      <div v-if="hasPrice(dish)" class="flex">
        <div>
          {{ dishName(dish) }} za
          <span class="daily-menu__price">{{ dishPrice(dish) }}</span>
        </div>
      </div>
      <div class="font-bold" v-else>{{ dishName(dish) }}</div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    dishes: {
      type: Array,
      required: true
    }
  },
  methods: {
    isCustom(dish) {
      if (Object.keys(dish).length > 0 && (dish.price || dish.name)) {
        return true;
      } else if (Object.keys(dish).length > 0 && dish.dish && Object.keys(dish.dish).length > 0 ) {
        return false;
      }
      return false;
    },
    hasPrice(dish) {
      if (this.isCustom(dish) && dish.price) {
        return true;
      }
      if (!this.isCustom(dish) && dish.dish && dish.dish.price && dish.dish.price !== "2020") {
        return true;
      }
      return false;
    },
    dishName(dish) {
      if (this.isCustom && dish.name) {
        return dish.name;
      }
      if (!this.isCustom(dish) && dish.dish && dish.dish.name) {
        return dish.dish.name
      }
      return ""
    },
    dishPrice(dish) {
      if (!this.isCustom(dish) && dish.dish && dish.dish.price) {
        return dish.dish.price
      }
       if (this.isCustom && dish.price) {
        return dish.price;
      }
      return ""
    }
  }
};
</script>

<style lang="scss">
.daily-menu {
  max-width: 100%;
  max-height: 100%;
  overflow-y: scroll;
  @media screen and (max-width: $tablet) {
    overflow: hidden;
  }
}
.daily-menu__dishes {
  margin-top: 15px;
  text-transform: lowercase;
  max-width: 98%;
}
.daily-menu__price {
  font-weight: 600;
}
// Custom Scroll Bar
.daily-menu::-webkit-scrollbar {
  width: 10px;
  background: $color-grey;
}
.daily-menu::-webkit-scrollbar-thumb {
  background-color: $color-pink;
}
</style>