import axios from 'axios'

// Production
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

// Dev
// export const api = axios.create({
//   baseURL: 'http://rsudsamrat.site:8991/',
//   timeout: 120000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// export const apiLabor = axios.create({
//   baseURL: 'http://rsudsamrat.site:8991/',
//   timeout: 120000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })
