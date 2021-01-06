<template>
  <div class="geolocation-map" @click="setShowLocation(false)">
    <div id="map-wrap" v-if="!loading">
      <client-only>
        <l-map :zoom="zoom" :center="getLatLng">
          <l-tile-layer :url="getTileLayerUrl"></l-tile-layer>
          <l-marker :lat-lng="getLatLng"></l-marker>
        </l-map>
      </client-only>
    </div>
    <div id="map-wrap" class="geolocation-map__loading" v-else>
      <Loading color />
    </div>
    <div class="geolocation-map__info" @click="setShowLocation(false)">
      <h3>{{ getAddress }}</h3>
      <img src="~/assets/icons/close.svg" class="geolocation-map__close">
    </div>
  </div>
</template>

<script>
import Loading from "./Loading"
import { mapGetters, mapMutations } from 'vuex'
  export default {
    components: {
      Loading
    },
    data() {
      return {
        zoom: 18,
        restaurant: null,
        latlng: [],
        loading: false
      }
    },
    async created() {
      this.restaurant = JSON.parse(this.getRestaurant)
      try {
        if (this.restaurant.custom) {
            this.loading = true;
            this.latlng = await this.$store.dispatch('location/getLocation', this.restaurant.location)
            this.latlng = JSON.parse(this.latlng)
            this.loading = false;
        }
      } catch(error) {
        this.latlng = ["50.0755", "14.4378"]
        this.loading = false;
      }
    },
    computed: {
      ...mapGetters({
        getRestaurant: 'restaurants/getRestaurant'
      }),
      getTileLayerUrl() {
        const id = 'mapbox/streets-v11'
        const accessToken = 'pk.eyJ1IjoicmFzaGNzdmUiLCJhIjoiY2s1MndqejFhMDI2djNmbWRoaGNlamtyMSJ9.knNK82pHuyzWHVA-UrlLYQ'
        return `https://api.mapbox.com/styles/v1/${id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`
      },
      getLatLng() {
        if (this.restaurant.custom) {
          return this.latlng
        } else {
          return [this.restaurant.restaurant.location.latitude, this.restaurant.restaurant.location.longitude];
        }
      },
      getAddress() {
        if (this.restaurant.custom) {
          return this.restaurant.location;
        } else {
          return this.restaurant.restaurant.location.address;
        }
      }
    },
    methods:{
      ...mapMutations({setShowLocation: 'currentRestaurant/setShowLocation'})
    }
  }
</script>

<style lang="scss" scoped>
  #map-wrap {
    height: 100%;
    width: 400px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 99;
    box-shadow: -45px 0 58px -20px rgba(0,0,0,0.23);
    transform: translateX(0) scale(1);
    transition: 0.5s cubic-bezier(0.2, 0.3, 0, 1);
  }
  .geolocation-map {
     width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    cursor: pointer;
  }
  .geolocation-map__info {
    position: absolute;
    z-index: 100;
    padding: 20px;
    top: 0;
    right: 0;
    width: 400px;
    height: 120px;
    background-color: $color-violet;
    color: $color-white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: $tablet) {
      width: 100%;
    }
  }
  .geolocation-map__close {
    font-family: sans-serif;
    position: relative;
    top: -32px;
    height: 24px;
  }
  .geolocation-map__loading {
    background-color: $color-white;
  }
</style>
