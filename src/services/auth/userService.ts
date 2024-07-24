import AuthClient from "./authClient"

export interface User {
    email: string,
    id: number,
    username: string
}

const userService = new AuthClient<User>('users/me/')

export default userService