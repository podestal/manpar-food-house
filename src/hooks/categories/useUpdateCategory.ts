import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getCategoryService, {Category} from "../../services/api/categoryServices"
import { CATEGORY_CACHE_KEY } from "../../constants"

export interface UpdateCategoryData {
    access: string
    category: Category
}

const useUpdateCategory = (categoryId: number | undefined, handleSuccess: () => void, handleError: () => void): UseMutationResult<Category, Error, UpdateCategoryData> => {
    const categoryService = getCategoryService(categoryId)
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: UpdateCategoryData) => categoryService.update(data.category, data.access),
        onSuccess: res => {
            handleSuccess()
            queryClient.setQueryData<Category[]>(CATEGORY_CACHE_KEY, prev => prev?.map( category => category.id === res.id ? res: category))
        },
        onError: err => {
            handleError()
            console.log(err)},
    })
}

export default useUpdateCategory
