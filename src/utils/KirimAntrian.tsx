import axios from 'axios'
import CryptoJS from 'crypto-js'

const data = process.env.REACT_APP_DATA_ID_JKN
const secretKey = process.env.REACT_APP_SECRET_KEY_JKN
const userKey = process.env.REACT_APP_USER_KEY_JKN
const url = process.env.REACT_APP_URL_API_JKN

const state = {}

function computeHMACSHA256(key, message) {
  // Create HMAC SHA-256 hash using CryptoJS
  const hmac = CryptoJS.HmacSHA256(message, key)
  return hmac.toString(CryptoJS.enc.Base64) // Convert to Base64 string
}

// const kodebookingList = ['']

async function makeRequest(taskId, kodebooking) {
  const tStamp = Math.floor(Date.now() / 1000).toString()
  const message = data + '&' + tStamp
  const signature = computeHMACSHA256(secretKey, message)
  const currentTimestamp = new Date().getTime()

  const timeIntervals = [10, 17, 22, 27, 34, 47, 60]
  const taskTimestamp = currentTimestamp + timeIntervals[taskId - 1] * 60 * 1000

  const requestBody = {
    kodebooking: kodebooking,
    taskid: taskId,
    waktu: taskTimestamp,
  }

  const headers = {
    'X-cons-id': data,
    'X-timestamp': tStamp,
    'X-signature': signature,
    // eslint-disable-next-line camelcase
    user_key: userKey,
  }

  try {
    const response = await axios.post(url, requestBody, { headers: headers })
    console.log('Berhasil :', response.data.metadata.message)
    console.log('TimeStamp :', tStamp)

    state[taskId] = true
    console.log(state)
  } catch (err) {
    if (err) {
      console.log(err)
      return
    } else {
      if (state[taskId] !== true) {
        setTimeout(() => makeRequest(taskId, kodebooking), 10000)
      } else {
        console.log(`Ulang Task Id ${taskId} Gagal.`)
      }
    }
  }
}

// async function makeRequestsSequentiallyKirimAntrian() {
//   for (let taskId = 1; taskId <= 7; taskId++) {
//     for (const kodebooking of kodebookingList) {
//       await makeRequest(taskId, kodebooking)
//     }
//   }
// }

async function makeRequestsSequentiallyKirimAntrian(noRawat, setIsLoading) {
  setIsLoading(true)
  try {
    for (let taskId = 1; taskId <= 7; taskId++) {
      await makeRequest(taskId, noRawat)
    }
  } finally {
    setIsLoading(false)
  }
}

export { makeRequestsSequentiallyKirimAntrian }
