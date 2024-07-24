import axios from 'axios'

const DEV = 'http://127.0.0.1:8000/auth/'

export interface JWTCredentials {
    username: string,
    password: string
}

const axiosInstance = axios.create({
    baseURL: DEV
})

class AuthClient<T> {
    endpoint: string

    constructor (endpoint: string) {
        this.endpoint = endpoint
    }

    get = () => {
        return axiosInstance
            .get<T>(this.endpoint)
            .then(res => res.data)
    }

    post = (data: JWTCredentials) => {
        return axiosInstance
            .post<T>(this.endpoint, data)
            .then(res => res.data)
    }
}

export default AuthClient