import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getCategoryService, {Category} from "../../services/api/categoryServices"
import { CATEGORY_CACHE_KEY } from "../../constants"

const useGetCategories = (access?: string): UseQueryResult<Category[], Error> => {
    const categoryServices = getCategoryService()
    return useQuery({
        queryKey: CATEGORY_CACHE_KEY,
        queryFn: () => categoryServices.get(access),
        staleTime: 1 * 60 * 1000,
    })
}

export default useGetCategories