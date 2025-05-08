import axios from "axios"

const BASE_URL_V2 = axios.create({
  baseURL: 'https://medicall.igormgoncalvs.com'
  // baseURL: 'http://localhost:3333'
})

export default BASE_URL_V2