import axios from 'axios'

/* dummy data, waiting real api */
export const api = axios.create({
  baseURL: 'http://rsudsamrat.site:8901/',
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
})
