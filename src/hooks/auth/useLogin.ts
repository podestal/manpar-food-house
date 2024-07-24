import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { JWTCredentials } from '../../services/auth/authClient'
import loginService, {JWT} from '../../services/auth/loginService'
import useUserStore from '../../store/userStore'

const useLogin = (handleSuccess: () => void, handleError: () => void): UseMutationResult<JWT, Error, JWTCredentials> => {
    
    const setTokens = useUserStore(s => s.setTokens)
    return useMutation({
        mutationFn: (data: JWTCredentials) => loginService.post(data),
        onSuccess: (jwtData: JWT) => {
            setTokens(jwtData.access, jwtData.refresh)
            handleSuccess()
        },
        onError: (error: Error) => {
            console.log(error)
            handleError()
        }
    })
}

export default useLogin

