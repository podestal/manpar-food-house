import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getDishService, {Dish} from "../../services/api/dishServices"
import { DISH_CACHE_KEY } from "../../constants"

export interface PostDishData {
    access: string
    dish: Dish
}

const usePostDish = (handleSuccess: () => void, handleError: () => void, setDishId: (value:number) => void): UseMutationResult<Dish, Error, PostDishData> => {
    const queryClient = useQueryClient()
    const dishService = getDishService()
    return useMutation({
        mutationFn: (data: PostDishData) => dishService.post(data.dish, data.access),
        onSuccess: res => {
            queryClient.setQueryData<Dish[]>(DISH_CACHE_KEY, prev => prev ? [...prev, res] : [res])
            if (res.id) {
                console.log('setting dish');
                
                setDishId(res.id)
            }
            handleSuccess()
        },
        onError: err => {
            handleError()
            console.log(err)}
    })
}

export default usePostDish
