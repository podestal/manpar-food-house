import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getOrderItemService, {OrderItem} from "../../services/api/orderItemService"
import { getOrderItemCacheKey } from "../../constants"

interface Props {
    orderId?: number
    billId?: number
    getToday?: boolean
    access: string
}

const useGetOrderItems = ({billId, getToday, access}: Props): UseQueryResult<OrderItem[], Error> => {
    const orderItemService = billId ? getOrderItemService({billId}) : getOrderItemService({})
    const ORDERITEM_CACHE_KEY = billId ? getOrderItemCacheKey({billId}) : getOrderItemCacheKey({getToday})
    return useQuery({
        queryKey: ORDERITEM_CACHE_KEY,
        queryFn: () => orderItemService.get(access),
        staleTime: 1 * 60 * 1000,
    })
    
}

export default useGetOrderItems