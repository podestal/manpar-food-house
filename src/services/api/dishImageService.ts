import APIClient from "./apiClient"

export interface DishImage {
    id?: number
    image: string
    dish: number
}

const getDishImageService = (dishId?: number, dishImgId?: number) => {
    let url
    console.log('dishImgId', dishImgId)
    
    if (dishImgId) {
        url = `/dish-images/${dishImgId}/`
    } else if (dishId) {
        url = `/dish-images/?dish=${dishId}`
    } else {
        url = '/dish-images/'
    }
    return new APIClient<DishImage>(url)
}

export default getDishImageService

