import axios from 'axios'

/* dummy data, waiting real api */
export const api = axios.create({
  baseURL: 'http://172.20.10.3:8080/',
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
})
