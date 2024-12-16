import {
  createPayload,
  createSalt,
  createSignature,
  createTimestamp,
  decrypt,
  encrypt,
} from '~/lib/cryptoService'

import axios from 'axios'
import { getCookie } from '~/lib/cookie'

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
    const encryptedData = encrypt(JSON.stringify(config.data))

    if (encryptedData.error) return Promise.reject(encryptedData.error)

    const timestamp = createTimestamp()
    const salt = createSalt()
    const payload = createPayload(timestamp, salt, config.data)
    const signature = createSignature(payload)

    const token = getCookie('access_token')
    config.data = encryptedData.data

    config.headers['X-TIMESTAMP'] = timestamp
    config.headers['X-SALT'] = salt
    config.headers['X-SIGNATURE'] = signature

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

    if (decryptedResponse.error) return Promise.reject(decryptedResponse.error)

    return {
      ...response,
      data: {
        ...response.data,
        data: JSON.parse(decryptedResponse.data ?? ''),
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
