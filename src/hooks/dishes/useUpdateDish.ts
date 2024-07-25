import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getDishService, { Dish } from "../../services/api/dishServices"
import { DISH_CACHE_KEY } from "../../constants"

export interface UpdateDishtData {
    access: string
    dish: Dish
}

const useUpdateDish = (dishId: number | undefined, handleSuccess: () => void, handleError: () => void): UseMutationResult<Dish, Error, UpdateDishtData> => {
    const queryClient = useQueryClient()
    const dishService = getDishService(dishId)
    return useMutation({
        mutationFn: (data: UpdateDishtData) => dishService.update(data.dish, data.access),
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