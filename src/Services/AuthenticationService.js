import axios from 'axios'
import qs from 'qs'

const login = (username, password) => new Promise((resolve, reject) => {
  let userData = {username: '', password: ''}
  axios.post('http://localhost:8000/login/', qs.stringify(userData), (err, res) => {
    console.log(err)
  })
})

export default login;