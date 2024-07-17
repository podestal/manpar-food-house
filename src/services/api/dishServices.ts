import APIClient from "./apiClient"

export interface Dish {
    id: number,
    name: string,
    description: string,
    cost: number,
    available: boolean,
    picture: string,
    created_at: Date,
    category: number,
}

export default new APIClient<Dish>('dishes/')