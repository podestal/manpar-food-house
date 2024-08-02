import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getDishImageService, {DishImage} from "../../services/api/dishImageService"
import { DISH_CACHE_KEY } from "../../constants"
import { Dish } from "../../services/api/dishServices"

export interface CreateDishImageData {
    access: string,
    dishImage: FormData
}

const useCreateDishImage = (): UseMutationResult<DishImage, Error, CreateDishImageData> => {
    const dishImageService = getDishImageService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateDishImageData) => dishImageService.formDataPost(data.dishImage, data.access),
        onSuccess: res => {
            queryClient.setQueryData<Dish[]>(DISH_CACHE_KEY, prev => prev?.map( dish => {
                if (dish.id === res?.dish) {
                    dish.image = res?.id
                    console.log('updated dish from img',dish)
                }
                return dish
            }))
        },
        onError: err => console.log(err)
    })
}

export default useCreateDishImage
