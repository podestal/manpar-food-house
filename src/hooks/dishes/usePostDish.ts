import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getDishService, {Dish} from "../../services/api/dishServices"
import { DISH_CACHE_KEY } from "../../constants"

export interface PostDishData {
    access: string
    dish: Dish
}

const usePostDish = (): UseMutationResult<Dish, Error, PostDishData> => {
    const queryClient = useQueryClient()
    const dishService = getDishService()
    console.log('hola');
    
    return useMutation({
        mutationFn: (data: PostDishData) => dishService.post(data.dish, data.access),
        onSuccess: res => console.log(res),
        onError: err => console.log(err)
    })
}

export default usePostDish
