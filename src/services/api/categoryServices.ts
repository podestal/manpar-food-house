import APIClient from "./apiClient"

export interface Category {
    id?: number
    name: string
    description: string
    time_period: string
}

const getCategoryService = (categoryId?: number) => {
    const URL = categoryId ? `categories/${categoryId}/` : 'categories/'
    return new APIClient<Category>(URL)
}

export default getCategoryService