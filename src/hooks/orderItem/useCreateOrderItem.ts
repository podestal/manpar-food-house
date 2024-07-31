import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getOrderItemService, { OrderItem } from "../../services/api/orderItemService"
import { Order } from "../../services/api/orderService"

export interface CreateOrderItemData {
    access: string
    orderItem: OrderItem
}

const useCreateOrerItem = (): UseMutationResult<OrderItem, Error, CreateOrderItemData> => {
    const orderItemService = getOrderItemService(0)
    // const dishService = getDishService()
    return useMutation({
        mutationFn: (data: CreateOrderItemData) => orderItemService.post(data.orderItem, data.access),
        onSuccess: res => console.log(res),
        onError: err => console.log(err),
    })
}

export default useCreateOrerItem
