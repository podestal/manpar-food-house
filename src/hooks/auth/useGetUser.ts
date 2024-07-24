import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { User } from "../../services/auth/userService"
import userService from "../../services/auth/userService"

const useGetUser = (access: string): UseQueryResult<User, Error> => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => userService.get(access),
    })
}

export default useGetUser