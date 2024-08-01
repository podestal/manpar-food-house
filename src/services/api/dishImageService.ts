import APIClient from "./apiClient"

export interface DishImage {
    id?: number
    image: FormData
}

const getDishImageService = (dishId: number, dishImgId?: number) => {
    const URL = dishImgId ? `/dishes/${dishId}/images/${dishImgId}` : `/dishes/${dishId}/images/`
    return new APIClient<DishImage>(URL)
}

export default getDishImageService