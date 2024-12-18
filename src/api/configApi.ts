import {
  createPayload,
  createSalt,
  createSignature,
  createTimestamp,
  decrypt,
  encrypt,
} from '~/lib/crypto'

import axios from 'axios'
import { getCookie } from '~/utils/cookie'

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
  async (config) => {
    if (config.method?.toUpperCase() === 'GET') {
      delete config.data
    } else {
      const encryptedData = encrypt(JSON.stringify(config.data))
      if (encryptedData.error) return Promise.reject(encryptedData.error)
      config.data = encryptedData.data
    }

    const timestamp = createTimestamp()
    const salt = createSalt()
    const payload = createPayload(timestamp, salt, config.data || '')
    const signature = createSignature(payload)

    config.headers['X-TIMESTAMP'] = timestamp
    config.headers['X-SALT'] = salt
    config.headers['X-SIGNATURE'] = signature

    const token = await getCookie('access_token')

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
  (error) => Promise.reject(error),
)

export default api
