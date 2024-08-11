import axios from 'axios'

const DEV = 'http://127.0.0.1:8000/auth/'
const TEST = 'https://manpar-api.vercel.app/auth/'

export interface JWTCredentials {
    username: string,
    password: string
}

const axiosInstance = axios.create({
    baseURL: TEST
})

class AuthClient<T> {
    endpoint: string

    constructor (endpoint: string) {
        this.endpoint = endpoint
    }

    get = (access: string) => {
        return axiosInstance
            .get<T>(this.endpoint, {
                headers: {Authorization: `JWT ${access}`}
            })
            .then(res => res.data)
    }

    post = (data: JWTCredentials) => {
        return axiosInstance
            .post<T>(this.endpoint, data)
            .then(res => res.data)
    }
}

export default AuthClient