import axios from 'axios'

export const api = {
  get: <T>(url: string, config = {}) =>
    axios.get<T>(url, config).then((response) => response.data),

  post: <T>(url: string, data = {}, config = {}) =>
    axios.post<T>(url, data, config).then((response) => response.data),

  put: <T>(url: string, data = {}, config = {}) =>
    axios.put<T>(url, data, config).then((response) => response.data),

  delete: <T>(url: string, config = {}) =>
    axios.delete<T>(url, config).then((response) => response.data),
}
