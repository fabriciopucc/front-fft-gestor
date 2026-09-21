import axios from 'axios'

let isLocal = false;

const api = axios.create({
  baseURL: (isLocal) ? "http://localhost:8080" : "https://fft-gestor-0fa59a1fbe69.herokuapp.com"
})


export default api;