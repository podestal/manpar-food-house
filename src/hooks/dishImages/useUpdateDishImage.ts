import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import getDishImageService, {DishImage} from "../../services/api/dishImageService"
import { getDishImageCacheKey } from "../../constants";

export interface UpdateDishData {
    access: string
    dishImage: FormData
}

const useUpdateDishImage = (dishId: number, dishImgId: number): UseMutationResult<DishImage, Error, UpdateDishData> => {
    const dishImageService = getDishImageService(dishId, dishImgId)
    const DISH_IMAGE_CACHE_KEY = getDishImageCacheKey(dishId)
    return useMutation({
        mutationFn: (data: UpdateDishData) => dishImageService.formDataUpdate(data.dishImage, data.access),
        onSuccess: res => console.log(res),
        onError: err => console.log(err),
    })
}

export default useUpdateDishImage

// import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
// import getDishService, { Dish } from "../../services/api/dishServices"
// import { DISH_CACHE_KEY } from "../../constants"

// export interface UpdateDishtData {
//     access: string
//     dish: Dish
// }

// const useUpdateDish = (dishId: number | undefined, handleSuccess: () => void, handleError: () => void): UseMutationResult<Dish, Error, UpdateDishtData> => {
//     const queryClient = useQueryClient()
//     const dishService = getDishService(dishId)
//     return useMutation({
//         mutationFn: (data: UpdateDishtData) => dishService.update(data.dish, data.access),
//         onSuccess: res => {
//             handleSuccess()
//             queryClient.setQueryData<Dish[]>(DISH_CACHE_KEY, prev => prev?.map( dish => dish.id === res.id ? res : dish))
//         },
//         onError: err => {
//             console.log(err)
//             handleError()
//         },
//     })
// }

// export default useUpdateDish