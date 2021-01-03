<template>
  <client-only>
    <div class="container">
      <div :class="{'container__inner':true, 'container__inner--open': showLocation}">
        <h2 class="title title--added">Denní Menu v tvém okolí</h2>
        <Loading v-if="gettingLocation" color />
        <div v-if="locationError" class="container__error">
          Oops, nemohu zjistit tvoji geolokaci, abys používal appku :( Povol to, prosím
        </div>
        <!-- <restaurant v-if="location" /> -->
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Restaurant from '~/components/Restaurant'
import Loading from '~/components/Loading'

export default {
  components: {
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
