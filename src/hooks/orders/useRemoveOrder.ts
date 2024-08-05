import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getOrderService, { Order } from "../../services/api/orderService"
import { getOrderCacheKey } from "../../constants"

export interface DeleteOrderData {
    access: string
}

interface Props {
    orderId: number
    tableId?: number
    setLoading?: (value: boolean) => void
}

const useRemoveOrder = ({orderId, tableId, setLoading}: Props): UseMutationResult<Order, Error, DeleteOrderData> => {
    const queryClient = useQueryClient()
    const orderService = getOrderService({orderId})
    const ORDER_CACHE_KEY = tableId ? getOrderCacheKey(tableId) : getOrderCacheKey()
    return useMutation({
        mutationFn: (data: DeleteOrderData) => orderService.delete(data.access),
        onMutate: () => setLoading && setLoading(true),
        onSuccess: () => {
            console.log(ORDER_CACHE_KEY)
            queryClient.setQueryData<Order[]>(ORDER_CACHE_KEY, prev => prev?.filter(order => order.id !== orderId))
            queryClient.setQueryData<Order[]>(['orders'], prev => prev?.filter(order => order.id !== orderId))
        },
        onError: err => console.log(err),
        onSettled: () => setLoading && setLoading(false)
    })
}

export default useRemoveOrder

