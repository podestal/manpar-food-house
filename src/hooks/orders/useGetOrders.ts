import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getOrderService, { Order } from "../../services/api/orderService"
import { getOrderCacheKey } from "../../constants"

interface Props {
    tableId?: number
    access: string
}

const useGetOrders = ({tableId, access}: Props): UseQueryResult<Order[], Error> => {
    const ORDER_CACHE_KEY  = tableId ? getOrderCacheKey(tableId) : getOrderCacheKey()
    const orderService = tableId ? getOrderService({tableId}) : getOrderService({})
    return useQuery({
        queryKey: ORDER_CACHE_KEY,
        queryFn: () => orderService.get(access),
        staleTime: 1 * 60 * 1000,
    })
}

export default useGetOrders
