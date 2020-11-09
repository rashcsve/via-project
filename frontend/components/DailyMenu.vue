<template>
  <section class="daily-menu">
    <h3>Denní menu 🧾:</h3>
    <div v-for="dish in dishes" :key="dish.dish.id" class="daily-menu__dishes">
      <div v-if="hasPrice(dish.dish.price)" class="flex">
        <div>
          {{ dish.dish.name }} za
          <span class="daily-menu__price">{{ dish.dish.price }}</span>
        </div>
      </div>
      <div class="font-bold" v-else>{{dish.dish.name}}</div>
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
    hasPrice(dish) {
      return dish && dish !== "2020";
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