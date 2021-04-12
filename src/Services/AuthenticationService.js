import http from '../Services/RequestService'
import qs from 'qs'

const login = (username, password) => new Promise((resolve, reject) => {
  http.post('login/', qs.stringify({ username, password }))
    .then((response) => {
      resolve(response)
    }, (error) => {
      reject(error)
    })
})

export default login;