import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getOrderItemService, { OrderItem } from "../../services/api/orderItemService"

export interface DeleteOrderItemData {
    access: string
}

interface Props {
    orderItemId: number
    orderId: number | undefined
    billId: number
}

const useRemoveOrderItem = ({orderItemId, orderId, billId}: Props): UseMutationResult<OrderItem, Error, DeleteOrderItemData> => {
    const queryClient = useQueryClient()
    const orderItemService = getOrderItemService({orderItemId})
    return useMutation({
        mutationFn: (data: DeleteOrderItemData) => orderItemService.delete(data.access),
        onSuccess: () => {
            queryClient.setQueryData<OrderItem[]>(['orderItems', billId], prev => prev?.filter( orderItem => orderItem.id !== orderItemId))
            queryClient.setQueryData<OrderItem[]>(['orderItems', orderId], prev => prev?.filter( orderItem => orderItem.id !== orderItemId))
        },
        onError: err => {
            console.log(err)
        }
    })
    
}

export default useRemoveOrderItem
