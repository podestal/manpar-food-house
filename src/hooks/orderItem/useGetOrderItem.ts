import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getOrderItemService, {OrderItem} from "../../services/api/orderItemService"
import { getOrderItemCacheKey } from "../../constants"

const useGetOrderItems = (orderId: number): UseQueryResult<OrderItem[], Error> => {
    const orderItemService = getOrderItemService(orderId)
    const ORDERITEM_CACHE_KEY = getOrderItemCacheKey(orderId)
    return useQuery({
        queryKey: ORDERITEM_CACHE_KEY,
        queryFn: orderItemService.get,
        staleTime: 1 * 60 * 1000,
    })
    
}

export default useGetOrderItems