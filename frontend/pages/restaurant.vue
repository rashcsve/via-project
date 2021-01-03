<template>
  <div class="container">
      <div :class="{'container__inner':true, 'container__inner--open': showLocation}">
        <Loading v-if="gettingLocation" color />
        <div v-if="locationError" class="container__error">
          Oops, nemohu zjistit tvoji geolokaci, abys používal appku :( Povol to, prosím
        </div>
        <restaurant v-if="location" />
      </div>
      <!-- Map Sidebar -->
      <div v-if="showLocation" class="container__geolocation-wrap">
        <geolocation-map />
      </div>
    </div>
</template>

<script>
import GeolocationMap from "../components/GeolocationMap"
  export default {
    components: {
      GeolocationMap
    }
  }
</script>

<style lang="scss" scoped>

</style>
