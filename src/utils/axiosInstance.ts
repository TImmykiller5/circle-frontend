import axios from 'axios'

const apiService = axios.create({
  baseURL: 'https://circle-backend-bo9w.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiService
