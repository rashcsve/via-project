<template>
  <client-only>
    <div class="container">
      <div class="container__inner container--form"  v-if="!wasAdded">
        <h2 class="title title--added">
          Přidej svoje menu!
        </h2>
        <form name="add-menu" @submit.prevent="save" class="form">
          <div class="form__container">
            <div class="form__left">
              <!-- Name -->
              <div class="form__box">
                <label class="title--detail" for="name">
                  Název restaurace
                </label>
                <input class="form-field" required name="name" id="name" v-model="restaurant.name" />
              </div>
              <!-- Address -->
              <div class="form__box">
                <label class="title--detail" for="address">
                  Adresa
                </label>
                <input class="form-field" required name="address" id="address" v-model="restaurant.location" />
              </div>
              <!-- Cuisine -->
              <div class="form__box">
                <label class="title--detail" for="cuisine">
                  Kuchyň
                </label>
                <!-- TODO Make it required -->
                <select v-model="restaurant.cuisines" class="form-field form-field__select">
                  <option disabled value="">Vyberte prosím</option>
                  <option v-for="(cuisine, i) in Object.entries(cuisines)" :key="i">{{ cuisine[1].translation }}</option>
                </select>
              </div>
              <!-- Price -->
              <div class="form__box">
                <label class="title--detail" for="price">
                  Cenová hladina
                </label>
                <!-- TODO Make it required -->
                <select v-model="restaurant.price_range" class="form-field form-field__select">
                  <option disabled value="">Vyberte prosím</option>
                  <option v-for="(option, i) in 5" :key="i">{{ option }}</option>
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
              <div class="form__box" v-for="(dish, i) in dishes" :key="i">
                <input class="form-field" required placeholder="Jídlo" v-model="dish.name" />
                <input class="form-field form-field--small" required placeholder="Cena" v-model="dish.price" />
                <p class="form-label">Kč</p>
              </div>
              <div class="button-link button-link--white" @click="addDish">
                Přidat další jídlo
              </div>
            </div>
          </div>
          <button class="button-link button-link--center" type="submit">
            Přidat restauraci
          </button>
          <nuxt-link to="/" class="button-link button-link--back restaurants__button--refresh">Vrátit se na domovskou stránku</nuxt-link>
        </form>
      </div>
      <div class="container__inner container--form container--added" v-else>
        <h2 class="title title--added">Menu této restaurace bylo úspěšně přidáno</h2>
        <nuxt-link to="/" class="button-link button-link--center restaurants__button--refresh">Vrátit se na domovskou stránku</nuxt-link>
      </div>
    </div>
  </client-only>
</template>

<script>
import axios from 'axios'
import { cuisines } from "../static/cuisines"

export default {
  data(){
    return {
      wasAdded: false,
      restaurantId: "",
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
        date: "",
        name: "",
        cuisines: "",
        price_range: 1,
        highlights: [],
        location: "",
        dishes: []
      }
    }
  },
  methods: {
    addDish() {
      const newDish = {
        name: "",
        price: ""
      };
      this.dishes.push(newDish);
    },
    async save() {
      if (this.hasTakeaway && !this.restaurant.highlights.includes("Takeaway Available")) {
        this.restaurant.highlights.push("Takeaway Available");
      }
      if (this.hasCreditCard && !this.restaurant.highlights.includes("Credit Card")) {
        this.restaurant.highlights.push("Credit Card");
      }
      this.restaurant.dishes = [...this.dishes];
      this.restaurant.date = new Date().toISOString().slice(0,10);
      try {
        const response = await this.$axios.$post(
          'new',
          { "restaurant": { ...this.restaurant } },
          { headers:
            {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        console.log(this.response)
        this.wasAdded = true;
        this.restaurantId = response.data;
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
