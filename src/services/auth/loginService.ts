import APIClient from "./authClient"

export interface JWT {
    access: string,
    refresh: string,
}

const loginService = new APIClient<JWT>('jwt/create/')

export default loginService