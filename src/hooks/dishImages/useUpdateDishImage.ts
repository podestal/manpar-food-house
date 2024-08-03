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
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: UpdateDishData) => dishImageService.formDataUpdate(data.dishImage, data.access),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: DISH_IMAGE_CACHE_KEY})
        },
        onError: err => console.log(err),
    })
}

export default useUpdateDishImage
