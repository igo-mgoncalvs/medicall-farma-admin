import axios from "axios"

const BASE_URL = axios.create({
  baseURL: process.env.baseUrl
})

export default BASE_URL