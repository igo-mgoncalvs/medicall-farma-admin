import axios, { InternalAxiosRequestConfig } from "axios"
import Cookies from 'js-cookie';

const BASE_URL = axios.create({
  baseURL: process.env.baseUrl
})

BASE_URL.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = Cookies.get('token')
  config.headers.Authorization = `Bearer ${token}`

  return config
})

export default BASE_URL