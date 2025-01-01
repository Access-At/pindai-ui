import EncryptRequestResponse from '~/lib/EncryptRequestResponse'
import axios from 'axios'
import { getCookie, removeCookie } from '~/utils/cookie'
import { redirect, RedirectType } from 'next/navigation'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Gunakan .env
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const encryptRequestResponse = new EncryptRequestResponse(
  process.env.NEXT_PUBLIC_SECURE_REQUEST_KEY as string,
)
encryptRequestResponse.injectInterceptors(api)

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    const token = await getCookie('access_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (!error.response) {
      return Promise.reject(error)
    }

    if (
      error.response.status === 401 &&
      error.response.data.message === 'Unauthenticated.'
    ) {
      await removeCookie('access_token')
      await removeCookie('user')

      throw redirect('/', 'push' as RedirectType)
    }

    return Promise.reject(error)
  },
)

export default api
