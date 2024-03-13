import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://rsudsamrat.site:8901/',
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiLabor = axios.create({
  baseURL: 'http://rsudsamrat.site:8901/',
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
})
