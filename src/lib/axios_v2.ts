import axios from "axios"

const BASE_URL_V2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_V2
  // baseURL: 'http://localhost:3333'
})

export default BASE_URL_V2