import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getOrderService, { Order } from "../../services/api/orderService"
import { getOrderCacheKey } from "../../constants"

export interface UpdateOrderData {
    access: string
    order: Order
}

const useUpdateOrder = (orderId: number, tableId?: number, setLoading?: (value: boolean) => void): UseMutationResult<Order, Error, UpdateOrderData> => {
    const queryClient = useQueryClient()
    const orderService = getOrderService({orderId})
    const ORDER_CACHE_KEY = tableId && getOrderCacheKey(tableId)
    return useMutation({
        mutationFn: (data: UpdateOrderData) => orderService.update(data.order, data.access),
        onMutate: () => setLoading && setLoading(true),
        onSuccess: res => {
            ORDER_CACHE_KEY && queryClient.setQueryData<Order[]>(ORDER_CACHE_KEY, prev => prev?.map( order => order.id === res.id ? res : order))
            res.status === 'S' && queryClient.setQueryData<Order[]>(['orders'], prev => prev ? [...prev, res] : [res])
            res.status === 'C' && queryClient.setQueryData<Order[]>(['orders'], prev => prev?.filter(order => order.id !== res.id))
            console.log(res)},
        onError: err => console.log(err),
        onSettled: () => setLoading && setLoading(false)
    })
}

export default useUpdateOrder
