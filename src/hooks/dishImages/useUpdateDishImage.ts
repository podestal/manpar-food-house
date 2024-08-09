import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import getDishImageService, {DishImage} from "../../services/api/dishImageService"
import { getDishImageCacheKey } from "../../constants";

export interface UpdateDishData {
    access: string
    dishImage: FormData
}

interface Props {
    dishId: number
    dishImgId: number
    setSuccess: (value: string) => void
    setError: (value: string) => void
}

const useUpdateDishImage = ({dishId, dishImgId, setSuccess, setError}: Props): UseMutationResult<DishImage, Error, UpdateDishData> => {
    const dishImageService = getDishImageService(dishId, dishImgId)
    const DISH_IMAGE_CACHE_KEY = getDishImageCacheKey(dishId)
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: UpdateDishData) => dishImageService.formDataUpdate(data.dishImage, data.access),
        onSuccess: () => {
            setSuccess('Imagen actualizada')
            setError('')
            queryClient.invalidateQueries({queryKey: DISH_IMAGE_CACHE_KEY})
        },
        onError: err => {
            setSuccess('')
            setError(`Ocurrió un Error y no se pudo cambiar la imagen: ${err.message}`)
        },
    })
}

export default useUpdateDishImage
