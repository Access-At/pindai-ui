import axios from 'axios'
import { getCookie } from '~/lib/cookie'
// import crypto from 'crypto'
import { decrypt, encrypt } from '~/lib/crypto'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Gunakan .env
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // const timestamp = Math.floor(Date.now() / 1000) // Timestamp dalam detik
    // const salt = crypto.randomBytes(16).toString('hex') // Salt dinamis
    // const secretKey = process.env.NEXT_PUBLIC_SECURE_API_KEY || ''
    const encryptedData = encrypt(JSON.stringify(config.data))
    // const payload = `${timestamp}${salt}${JSON.stringify(config.data)}`
    // const payload = `${timestamp}${salt}${encryptedData}`
    // const signature = crypto
    //   .createHmac('sha256', secretKey)
    //   .update(payload)
    //   .digest('hex')

    const token = getCookie('access_token')
    config.data = encryptedData
    // config.headers['X-TIMESTAMP'] = timestamp
    // config.headers['X-SALT'] = salt
    // config.headers['X-SIGNATURE'] = signature
    // config.headers['X-PAYLOAD'] = payload

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    const encryptedResponse = response.data.data
    const decryptedResponse = decrypt(encryptedResponse)
    return {
      ...response,
      data: {
        ...response.data,
        data: JSON.parse(decryptedResponse),
      },
    }
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized! Redirecting...')
    }
    return Promise.reject(error)
  },
)

export default api
