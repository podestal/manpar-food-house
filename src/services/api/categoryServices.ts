import APIClient from "./apiClient"

export interface Category {
    id: number,
    name: string,
    description: string,
}

export default new APIClient<Category>('categories/')