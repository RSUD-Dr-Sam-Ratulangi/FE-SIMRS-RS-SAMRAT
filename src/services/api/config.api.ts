import axios from "axios";

/* dummy data, waiting real api */
export const api = axios.create({
    baseURL: 'https://dummyjson.com/',
    timeout: 120000,
    headers: {
      "Content-Type": "application/json",
    },
})