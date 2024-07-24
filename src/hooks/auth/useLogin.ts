import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { JWTCredentials } from '../../services/auth/authClient'
import loginService, {JWT} from '../../services/auth/loginService'

const useLogin = (handleSuccess: () => void, handleError: () => void): UseMutationResult<JWT, Error, JWTCredentials> => {
    return useMutation({
        mutationFn: (data: JWTCredentials) => loginService.post(data),
        onSuccess: (jwtData: JWT) => {
            localStorage.setItem('access', jwtData.access)
            localStorage.setItem('refresh', jwtData.refresh)
            handleSuccess()
        },
        onError: (error: Error) => {
            console.log(error)
            handleError()
        }
    })
}

export default useLogin

