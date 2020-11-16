<template>
  <client-only>
    <div class="container">
      <div class="container__inner container--form">
        <h2 class="title title--added">
          Přidej svoje menu!
        </h2>
        <form name="add-menu" @click="save" class="form">
          <div class="form__container">
            <div class="form__left">
              <!-- Name -->
              <div class="form__box">
                <label class="title--detail" for="name">
                  Jméno restaurace
                </label>
                <input class="form-field" required name="name" id="name" v-model="restaurant.name" />
              </div>
              <!-- Address -->
              <div class="form__box">
                <label class="title--detail" for="address">
                  Adresa
                </label>
                <input class="form-field" required name="address" id="address" v-model="restaurant.location.address" />
              </div>
              <!-- Cuisine -->
              <div class="form__box">
                <label class="title--detail" for="cuisine">
                  Kuchyň
                </label>
                <!-- <input class="form-field" required name="cuisine" id="cuisine" v-model="restaurant.cuisines" /> -->
                <select v-model="restaurant.cuisines">
                  <option disabled value="">Vyberte prosím</option>
                  <option v-for="cuisine in Object.entries(cuisines)">{{ cuisine[1].translation }}</option>
                </select>
              </div>
              <!-- Price -->
              <div class="form__box">
                <label class="title--detail" for="price">
                  Cenová hladina
                </label>
                <select v-model="restaurant.price_range">
                  <option disabled value="">Vyberte prosím</option>
                  <option v-for="option in 5">{{ option }}</option>
                </select>
              </div>
              <!-- Takeaway option -->
              <div class="form__box">
                <label class="title--detail" for="takeaway">
                  Jídlo s sebou
                </label>
                <input type="radio" id="takeaway-yes" value="takeaway-yes" v-model="hasTakeaway">
                <label class="radio-label" for="takeaway-yes">Ano</label>
                <input type="radio" id="takeaway-no" value="takeaway-no" v-model="hasTakeaway">
                <label class="radio-label" for="takeaway-no">Ne</label>
              </div>
              <!-- Pay with card option -->
              <div class="form__box">
                <label class="title--detail" for="card">
                  Platba kartou
                </label>
                <input type="radio" id="card-yes" value="card-yes" v-model="hasCreditCard">
                <label class="radio-label" for="card-yes">Ano</label>
                <input type="radio" id="card-no" value="card-no" v-model="hasCreditCard">
                <label class="radio-label" for="card-no">Ne</label>
              </div>
            </div>
            <div class="form__right">
              <label class="title--detail" for="menu">
                Denní menu
              </label>
              <div class="form__box" v-for="dish in dishes">
                <input class="form-field" placeholder="Jídlo" v-model="dish.name" />
                <input class="form-field" placeholder="Cena" v-model="dish.price" />
              </div>
              <div class="button-link button-link--white" @click="addDish">
                Přidat další jídlo
              </div>
            </div>
          </div>
          <button class="button-link" type="submit">
            Přidat restauraci
          </button>
        </form>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { cuisines } from "../static/cuisines"

export default {
  data(){
    return {
      hasTakeaway: false,
      cuisines: cuisines,
      hasCreditCard: false,
      dishes: [
        {
          name: "",
          price: ""
        }
      ],
      restaurant: {
        custom: true,
        name: "",
        cuisines: "",
        price_range: 1,
        highlights: [],
        location: {
          address: ""
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      showLocation: 'currentRestaurant/getShowLocation'
    })
  },
  methods: {
    addDish() {
      const newDish = {
        name: "",
        price: ""
      };
      this.dishes.push(newDish);
    },
    save() {
      console.log(this.restaurant);
    }
  }
}
</script>

<style lang="scss">

</style>
