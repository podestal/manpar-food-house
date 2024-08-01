import APIClient from "./apiClient"

export interface Dish {
    id?: number,
    name: string,
    description: string,
    cost: number,
    available: boolean,
    picture: string,
    created_at?: Date,
    category: number,
}

const getDishService = (dishId?: number) => {
    const URL = dishId ? `dishes/${dishId}/` : 'dishes/'
    return new APIClient<Dish>(URL)
}

export default getDishService