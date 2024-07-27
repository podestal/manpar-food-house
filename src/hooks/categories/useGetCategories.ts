import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getCategoryService, {Category} from "../../services/api/categoryServices"
import { CATEGORY_CACHE_KEY } from "../../constants"

const useGetCategories = (): UseQueryResult<Category[], Error> => {
    const categoryServices = getCategoryService()
    return useQuery({
        queryKey: CATEGORY_CACHE_KEY,
        queryFn: categoryServices.get,
        staleTime: 1 * 60 * 1000,
    })
}

export default useGetCategories