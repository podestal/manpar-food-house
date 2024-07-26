import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getCategoryService, { Category } from "../../services/api/categoryServices"
import { CATEGORY_CACHE_KEY } from "../../constants"

export interface DeleteCategoryData {
    access: string
}

const useRemoveCategory = (categoryId: number | undefined): UseMutationResult<Category, Error, DeleteCategoryData> => {
    const queryClient = useQueryClient()
    const categoryService = getCategoryService(categoryId)
    return useMutation({
        mutationFn: (data: DeleteCategoryData) => categoryService.delete(data.access),
        onSuccess: res => {
            queryClient.setQueryData<Category[]>(CATEGORY_CACHE_KEY, prev => prev?.filter( category => category.id !== categoryId))
            console.log(res)},
        onError: err => console.log(err),
    })
}

export default useRemoveCategory
