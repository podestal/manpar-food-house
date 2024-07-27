import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getCategoryService, { Category } from "../../services/api/categoryServices"
import { CATEGORY_CACHE_KEY } from "../../constants"

export interface CreateCategoryData {
    access: string,
    category: Category
}

const useCreateCategory = (handleSuccess: () => void, handleError: () => void): UseMutationResult<Category, Error, CreateCategoryData> => {
    const queryClient = useQueryClient()
    const categoryService = getCategoryService()
    return useMutation({
        mutationFn: (data: CreateCategoryData) => categoryService.post(data.category, data.access),
        onSuccess: (res) => {
            console.log('res', res)
            handleSuccess()
            queryClient.setQueryData<Category[]>(CATEGORY_CACHE_KEY, prev => prev ? [...prev, res] : [res])
        },
        onError: (err) => {
            console.log(err)
            handleError()
        }
    })
}

export default useCreateCategory