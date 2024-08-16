import axios from 'axios'

const URL = import.meta.env.VITE_AUTH_URL

export interface JWTCredentials {
    username: string,
    password: string
}

const axiosInstance = axios.create({
    baseURL: URL
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