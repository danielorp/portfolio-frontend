import axios from 'axios'
import qs from 'qs'

export default class AuthenticationService {
    constructor () {
        this.http = axios
    }
    
    async doLogin (user, pass) {
        try {
          const requestOptions = {
              headers: {
                'Content-Type': 'application/json'
              },
              validateStatus: (status) => status < 500
           }
          const {data: jwt, status} = await this.http.post(`http://localhost:8000/login/`, {username: user, password: pass}, requestOptions)
          if (status === 401) throw new Error('Usuário ou senha inválidos')
          return jwt              
        } catch (err) {
           throw err
        }
    }

    async login() {
      let userData = {
        username: '',
        password: '',
      }
      try {
        const {data: jwt, status} = await this.http.post('http://localhost:8000/login/', qs.stringify(userData))
        if (status === 401) throw new Error('Usuário ou senha inválidos')
        return jwt
      }
      catch (error) {
        console.log(error)
      }
      
    }
}