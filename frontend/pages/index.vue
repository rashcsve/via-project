<template>
  <client-only>
    <div class="container">
      <div :class="{'container__inner':true, 'container__inner--open': showLocation}">
        <Loading v-if="gettingLocation" color />
        <div v-if="locationError" class="container__error">
          Oops, nemohu zjistit tvoji geolokaci, abys používal appku :( Povol to, prosím
        </div>
        <restaurant v-if="location" />
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
// import GeolocationMap from '~/components/GeolocationMap'
import Restaurant from '~/components/Restaurant'
import Loading from '~/components/Loading'

export default {
  components: {
    // GeolocationMap,
    Restaurant,
    Loading
  },
  data(){
    return {
      location: null,
      gettingLocation: false,
      locationError: null
    }
  },
  async created() {
    // Do we support geolocation
    if (process.client) {
      this.gettingLocation = true;
      if(!("geolocation" in navigator)) {
        this.locationError = 'Geolocation is not available.';
        this.gettingLocation = false;
        return;
      }
      let position = await this.getPosition();
      this.setLocation(position.coords)
      this.location = position;
      this.gettingLocation = false;
    }
  },
  computed: {
    ...mapGetters({
      showLocation: 'currentRestaurant/getShowLocation'
    })
  },
  methods: {
    ...mapMutations({
      setLocation: 'location/setLocation'
    }),
    getPosition() {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    }
  }
}
</script>

<style lang="scss">
.container {
  overflow: auto;
  transform-origin: 50% 50%;
  perspective: 2000px;
  position: absolute;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  top: 20px;
  left: 20px;
}
.container__inner {
  position: absolute;
  background: white;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  transition: 0.5s cubic-bezier(0.2, 0.3, 0, 1);
  transform: rotateY(0);
  transform-origin: left center;
  display: flex;
  flex-flow: column;
  justify-content: space-between;

  &--open {
    transform: rotateY(20deg);
    @media screen and (max-width: $tablet) {
      transform: rotateY(0);
    }
  }
  @media screen and (max-width: $tablet) {
    height: auto;
  }
}
.container__link {
  margin-bottom: 20px;
}
.container__error {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
</style>
