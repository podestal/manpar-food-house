import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getDishImageService, {DishImage} from "../../services/api/dishImageService"
import { getDishImageCacheKey } from "../../constants"

const useGetDishImage = (dishId: number): UseQueryResult<DishImage[], Error> => {
    const dishImageService = getDishImageService(dishId)
    const DISH_IMAGE_CACHE_KEY = getDishImageCacheKey(dishId)
    return useQuery({
        queryKey: DISH_IMAGE_CACHE_KEY,
        queryFn: () => dishImageService.get(),
        staleTime: 1 * 60 * 1000,
    })
}

export default useGetDishImage
