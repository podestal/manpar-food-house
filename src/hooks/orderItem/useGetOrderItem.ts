import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getOrderItemService, {OrderItem} from "../../services/api/orderItemService"
import { getOrderItemCacheKey } from "../../constants"

interface Props {
    orderId?: number
    billId?: number
}

const useGetOrderItems = ({orderId, billId}: Props): UseQueryResult<OrderItem[], Error> => {
    const orderItemService = orderId ? getOrderItemService({orderId}) : getOrderItemService({bill: billId})
    const ORDERITEM_CACHE_KEY = getOrderItemCacheKey({billId})
    return useQuery({
        queryKey: ORDERITEM_CACHE_KEY,
        queryFn: orderItemService.get,
        staleTime: 1 * 60 * 1000,
    })
    
}

export default useGetOrderItems