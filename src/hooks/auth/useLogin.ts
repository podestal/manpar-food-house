import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { JWTCredentials } from '../../services/auth/authClient'
import loginService, {JWT} from '../../services/auth/loginService'
import useUserStore from '../../store/userStore'

const useLogin = (handleSuccess: () => void, handleError: () => void, setLoading: (value: boolean) => void): UseMutationResult<JWT, Error, JWTCredentials> => {
    
    const setTokens = useUserStore(s => s.setTokens)
    return useMutation({
        mutationFn: (data: JWTCredentials) => loginService.post(data),
        onMutate: () => setLoading(true),
        onSuccess: (jwtData: JWT) => {
            setTokens(jwtData.access, jwtData.refresh)
            handleSuccess()
        },
        onError: () => {
            handleError()
        },
        onSettled: () => setLoading(false)
    })
}

export default useLogin

