import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getDishService, {Dish} from "../../services/api/dishServices"
import { DISH_CACHE_KEY } from "../../constants"

export interface PostDishData {
    access: string
    dish: FormData
}

const usePostDish = (handleSuccess: () => void, handleError: () => void): UseMutationResult<Dish, Error, PostDishData> => {
    const queryClient = useQueryClient()
    const dishService = getDishService()
    return useMutation({
        mutationFn: (data: PostDishData) => dishService.formDataPost(data.dish, data.access),
        onSuccess: res => {
            queryClient.setQueryData<Dish[]>(DISH_CACHE_KEY, prev => prev ? [...prev, res] : [res])
            handleSuccess()
        },
        onError: err => {
            handleError()
            console.log(err)}
    })
}

export default usePostDish
