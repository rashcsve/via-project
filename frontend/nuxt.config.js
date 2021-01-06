
export default {
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || 'Daily Menu Application',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || 'A simple SPA application for showing lunch menus of selected restaurants built on REST API.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  env: {
    HOST_URL: process.env.HOST_URL || 'http://localhost:5000'
  },
  /*
   ** Customize the progress-bar color
   */
  // loading: '~/components/Loading.vue',
  /*
   ** Global CSS
   */
  css: [
    '@/assets/css/main.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/localStorage.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-leaflet',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      './assets/css/vars.scss' // use underscore "_" & also file extension ".scss"
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL:  process.env.BASE_URL || 'https://daily-menu-backend.herokuapp.com/api/',
    headers: {
      Accept: 'application/json'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
