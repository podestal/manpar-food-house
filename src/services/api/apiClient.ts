import axios from 'axios'

const DEV = 'http://127.0.0.1:8000/api/'
const TEST = 'https://manpar-api.vercel.app/api/'

const axiosInstance = axios.create({
    baseURL: TEST
})

class APIClient<T> {
    endpoint: string

    constructor (endpoint: string) {
        this.endpoint = endpoint
    }

    get = (access?: string) => {

        const config = access 
        ? {headers: {Authorization: `JWT ${access}`}}
        : {}

        return axiosInstance
            .get<T>(this.endpoint, config)
            .then(res => res.data)
    }

    post = (data: T, access: string) => {
        return axiosInstance
            .post<T>(this.endpoint, data, {
                headers: {Authorization: `JWT ${access}`}
            })
            .then(res => res.data)
    }

    delete = (access: string) => {
        return axiosInstance
            .delete<T>(this.endpoint, {
                headers: {Authorization: `JWT ${access}`}
            })
            .then( res => res.data)
    }

    update = (data: T, access: string) => {
        return axiosInstance
            .patch<T>(this.endpoint, data, {
                headers: { Authorization: `JWT ${access}` }
            })
            .then( res => res.data)
    }

    authGet = (access: string) => {
        return axiosInstance
            .get<T>(this.endpoint, {
                headers: { Authorization: `JWT ${access}` }
            })
    }

    formDataPost = (data: FormData, access: string) => {
        return axiosInstance
            .post<any>(this.endpoint, data, {
                headers: {Authorization: `JWT ${access}`}
            })
            .then(res => res.data)
    }  
    

    formDataUpdate = (data: FormData, access: string) => {
        return axiosInstance
            .put<any>(this.endpoint, data, {
                headers: {Authorization: `JWT ${access}`}
            })
            .then(res => res.data)
    }   
}

export default APIClient