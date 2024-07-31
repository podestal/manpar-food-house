import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getOrderItemService, { OrderItem } from "../../services/api/orderItemService"
import { getOrderItemCacheKey } from "../../constants"

export interface CreateOrderItemData {
    access: string
    orderItem: OrderItem
}

const useCreateOrerItem = (orderId: number, handleSuccess: () => void, handleError: () => void): UseMutationResult<OrderItem, Error, CreateOrderItemData> => {
    const orderItemService = getOrderItemService(0)
    const queryClient = useQueryClient()
    const ORDERITEM_CACHE_KEY = getOrderItemCacheKey(orderId)
    return useMutation({
        mutationFn: (data: CreateOrderItemData) => orderItemService.post(data.orderItem, data.access),
        onSuccess: res => {            
            handleSuccess()
            queryClient.setQueryData<any[]>(ORDERITEM_CACHE_KEY, prev => prev ? [...prev, res] : [res])
        },
        onError: err => {
            handleError()
            console.log(err)},
    })
}

export default useCreateOrerItem
