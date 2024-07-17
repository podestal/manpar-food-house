import { useQuery, UseQueryResult } from "@tanstack/react-query"
import dishServices, {Dish} from "../../services/api/dishServices"
import { DISH_CACHE_KEY } from "../../constants"

const useGetDishes = (): UseQueryResult<Dish[], Error> => {
    return useQuery({
        queryKey: DISH_CACHE_KEY,
        queryFn: dishServices.get,
        staleTime: 1 * 60 * 1000,
    })
}

export default useGetDishes