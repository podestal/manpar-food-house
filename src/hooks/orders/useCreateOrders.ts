import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import getOrderService, { Order } from "../../services/api/orderService";
import { ORDER_CACHE_KEY, TABLE_CACHE_KEY } from "../../constants";

export interface PostOrderData {
    access: string
    order: Order
}

const usePostOrder = (handleSuccess: () => void, handleError: () => void): UseMutationResult<Order, Error, PostOrderData> => {
    const orderService = getOrderService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: PostOrderData) => orderService.post(data.order, data.access),
        onSuccess: res => {
            console.log(res)
            handleSuccess()
        },
        onError: err => {
            console.log(err)
            handleError()
        }
    })
}

export default usePostOrder