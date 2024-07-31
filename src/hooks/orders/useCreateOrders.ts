import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import getOrderService, { Order } from "../../services/api/orderService";
import { getOrderCacheKey, TABLE_CACHE_KEY } from "../../constants";
import { Table } from "../../services/api/tableService";

export interface PostOrderData {
    access: string
    order: Order
}

const usePostOrder = (tableId: number, handleSuccess: () => void, handleError: () => void): UseMutationResult<Order, Error, PostOrderData> => {
    const orderService = getOrderService(tableId)
    const queryClient = useQueryClient()
    const ORDER_CACHE_KEY = getOrderCacheKey(tableId)
    return useMutation({
        mutationFn: (data: PostOrderData) => orderService.post(data.order, data.access),
        onSuccess: res => {
            console.log(res)
            handleSuccess()
            queryClient.invalidateQueries({queryKey: TABLE_CACHE_KEY})
            queryClient.setQueryData<Order[]>(ORDER_CACHE_KEY, prev => prev ? [...prev, res] : [res])
        },
        onError: err => {
            console.log(err)
            handleError()
        }
    })
}

export default usePostOrder