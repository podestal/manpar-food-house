import { jwtDecode } from "jwt-decode"

const isTokenExpired = (token: string): boolean => {
    try {
        const decode = jwtDecode(token)
        if (decode.exp) {
            return decode.exp * 1000 < Date.now()
        }
        return false
    }
    catch (error) {
        return true
    }
}

export default isTokenExpired