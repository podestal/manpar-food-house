// import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
// import getDishService, { Dish,  } from "../../services/api/dishServices"
// import { DISH_CACHE_KEY } from "../../constants"

// export interface DeletePostData {
//     access: string
// }

// const useRemoveDish = (dishId: number): UseMutationResult<Dish, Error, DeletePostData> => {
//     const queryClient = useQueryClient()
//     const dishService = getDishService(dishId)
//     return useMutation({
//         mutationFn: (data: DeletePostData) => dishService.delete(data.access),
//         onSuccess: () => {
//             queryClient.setQueryData<Dish[]>(DISH_CACHE_KEY, prev => prev?.filter(dish => dish.id !== dishId))
//         },
//         onError: err => console.log(err)
//     })
// }

// export default useRemoveDish

import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getDishService, { Dish } from "../../services/api/dishServices"
import { DISH_CACHE_KEY } from "../../constants"

export interface UpdatePostData {
    access: string
    dish: Dish
}

const useUpdateDish = (dishId: number): UseMutationResult<Dish, Error, UpdatePostData> => {
    const queryClient = useQueryClient()
    const dishService = getDishService(dishId)
    return useMutation({
        mutationFn: (data: UpdatePostData) => dishService.update(data.dish, data.access),
        onSuccess: res => console.log(res),
        onError: err => console.log(err),
    })
}

export default useUpdateDish