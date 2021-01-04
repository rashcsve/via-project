export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create()

  // Set baseURL to something different
  api.setBaseURL(process.env.baseURL)

  // Inject to context as $api
  inject('api', api)
}
