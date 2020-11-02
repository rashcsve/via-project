export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      'user-key': 'cbd3a114b35a5ae4bd5232a54a7e6e88' 
    }
  })

  // Set baseURL to something different
  api.setBaseURL(process.env.baseURL)

  // Inject to context as $api
  inject('api', api)
}