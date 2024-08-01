import { useMutation, UseMutationResult } from "@tanstack/react-query"
import getDishImageService, {DishImage} from "../../services/api/dishImageService"

export interface CreateDishImageData {
    access: string,
    dishImage: FormData
}

const useCreateDishImage = (): UseMutationResult<DishImage, Error, CreateDishImageData> => {
    const dishImageService = getDishImageService()
    return useMutation({
        mutationFn: (data: CreateDishImageData) => dishImageService.formDataPost(data.dishImage, data.access),
        onSuccess: res => console.log(res),
        onError: err => console.log(err)
    })
}

export default useCreateDishImage
