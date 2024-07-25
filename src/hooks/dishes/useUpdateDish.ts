import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getDishService, { Dish } from "../../services/api/dishServices"
import { DISH_CACHE_KEY } from "../../constants"

export interface UpdatePostData {
    access: string
    dish: Dish
}

const useUpdateDish = (dishId: number, handleSuccess: () => void, handleError: () => void): UseMutationResult<Dish, Error, UpdatePostData> => {
    const queryClient = useQueryClient()
    const dishService = getDishService(dishId)
    return useMutation({
        mutationFn: (data: UpdatePostData) => dishService.update(data.dish, data.access),
        onSuccess: res => {
            handleSuccess()
            queryClient.setQueryData<Dish[]>(DISH_CACHE_KEY, prev => prev?.map( dish => dish.id === res.id ? res : dish))
        },
        onError: err => {
            console.log(err)
            handleError()
        },
    })
}

export default useUpdateDish