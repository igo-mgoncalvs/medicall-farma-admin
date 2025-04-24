import axios, { InternalAxiosRequestConfig } from "axios"
import Cookies from 'js-cookie';

const BASE_URL_V2 = axios.create({
  baseURL: 'https://medicall.igormgoncalvs.com'
})

BASE_URL_V2.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = Cookies.get('token')
  config.headers.Authorization = `Bearer ${token}`

  return config
})

export default BASE_URL_V2