<template>
  <div class="container">
    <div class="container__inner container__index container__docs">
      <h2 class="title title--added">Dokumentace</h2>
      <p>
        This semestral project was build for the course Internet Applications Development (VIA) on Czech Technical University in Prague.
      </p>
      <h3>Popis</h3>
      <p>
        This is a simple web application for showing lunch menus of selected restaurants in Prague built on REST API. The idea is to create a simple but beautiful web application where people could find or add daily menus of the restaurants near them.
        <br>
        A web app will show restaurants with different details (cuisines, price range, rating, takeaway, and credit card options) and its daily menu.
      </p>
      <h3>API</h3>
      <ul>
        <li><a href="https://developers.zomato.com/api" target="_blank">Zomato API</a> to get information about the nearest restaurants and its daily menu</li>
        <li><a href="https://leafletjs.com/" target="_blank">Leaflet Map API</a> to show the restaurant on the map</li>
        <li><a href="https://daily-menu-backend.herokuapp.com/" target="_blank">Custom API</a> with <a href="https://www.mongodb.com/" target="_blank">MongoDB</a> to add a new restaurant with its daily menu</li>
      </ul>
      <div class="restaurants__buttons restaurants__buttons--docs">
        <nuxt-link to="/" class="button-link button-link--center restaurants__button--refresh">Vrátit se na domovskou stránku</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>

</style>
