import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getDishService, { Dish,  } from "../../services/api/dishServices"
import { DISH_CACHE_KEY } from "../../constants"

export interface DeletePostData {
    access: string
}

const useRemoveDish = (dishId: number | undefined): UseMutationResult<Dish, Error, DeletePostData> => {
    const queryClient = useQueryClient()
    const dishService = getDishService(dishId)
    return useMutation({
        mutationFn: (data: DeletePostData) => dishService.delete(data.access),
        onSuccess: () => {
            queryClient.setQueryData<Dish[]>(DISH_CACHE_KEY, prev => prev?.filter(dish => dish.id !== dishId))
        },
        onError: err => console.log(err)
    })
}

export default useRemoveDish
