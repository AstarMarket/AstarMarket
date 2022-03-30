import axiosBase, { AxiosRequestConfig } from 'axios'

const axios = axiosBase.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL })

export async function get<T>(url: string, config: AxiosRequestConfig = {}) {
  const res = await axios.get<T>(url, config)
  return res.data
}

export async function post<T>(
  url: string,
  data: {},
  config: AxiosRequestConfig = {}
) {
  const res = await axios.post<T>(url, data, config)
  return res.data
}

export async function patch<T>(
  url: string,
  data: {},
  config: AxiosRequestConfig = {}
) {
  const res = await axios.patch<T>(url, data, config)
  return res.data
}

export async function deleteMethod<T>(
  url: string,
  config: AxiosRequestConfig = {}
) {
  const res = await axios.delete<T>(url, config)
  return res.data
}
