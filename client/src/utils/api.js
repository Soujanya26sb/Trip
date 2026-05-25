import axios from 'axios'

const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:5000',

  headers: {
    'Content-Type': 'application/json',
  },

  timeout: 10000,
})

// REQUEST INTERCEPTOR
API.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const userEmail =
        localStorage.getItem('trip_user_email') ||
        sessionStorage.getItem('trip_user_email')

      if (userEmail) {
        config.headers['X-User-Email'] = userEmail
      }
    }

    return config
  },

  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (response) => response,

  (error) => {
    console.error(
      'API Response Error:',
      error?.response?.data || error.message
    )

    if (error.response) {
      console.error('Status:', error.response.status)
      console.error('Data:', error.response.data)
    }

    return Promise.reject(error)
  }
)

export default API