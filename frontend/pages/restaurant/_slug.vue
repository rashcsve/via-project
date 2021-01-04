<template>
  <div class="container">
    <div :class="{'container__inner':true, 'container__inner--open': showLocation}">
      <restaurant />
    </div>
    <!-- Map Sidebar -->
    <div v-if="showLocation" class="container__geolocation-wrap">
      <geolocation-map />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GeolocationMap from "../../components/GeolocationMap"
import Restaurant from "../../components/Restaurant"
  export default {
    components: {
      GeolocationMap,
      Restaurant
    },
    computed: {
      ...mapGetters({
        showLocation: 'currentRestaurant/getShowLocation'
      })
    },
  }
</script>

<style lang="scss" scoped>

</style>
