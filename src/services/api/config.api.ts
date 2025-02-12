import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

// Production http
export const api = axios.create({
  baseURL: apiUrl,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiLabor = axios.create({
  baseURL: apiUrl,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiRadiologi = axios.create({
  baseURL: apiUrl,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// const apiUrl = process.env.REACT_APP_API_URL

// Production https
// export const api = axios.create({
//   baseURL: apiUrl,
//   timeout: 120000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// export const apiLabor = axios.create({
//   baseURL: apiUrl,
//   timeout: 120000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// export const apiRadiologi = axios.create({
//   baseURL: apiUrl,
//   timeout: 120000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

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

// export const apiRadiologi = axios.create({
//   baseURL: 'http://rsudsamrat.site:8991/',
//   timeout: 120000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })
