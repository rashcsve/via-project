<template>
  <div class="container">
      Meow
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GeolocationMap from "../../components/GeolocationMap"
  export default {
    components: {
      GeolocationMap
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
