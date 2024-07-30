import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import getOrderService, { Order } from "../../services/api/orderService";
import { TABLE_CACHE_KEY } from "../../constants";
import { Table } from "../../services/api/tableService";

export interface PostOrderData {
    access: string
    order: Order
}

const usePostOrder = (handleSuccess: () => void, handleError: () => void, setLocalOrders: React.Dispatch<React.SetStateAction<Order[]>>): UseMutationResult<Order, Error, PostOrderData> => {
    const orderService = getOrderService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: PostOrderData) => orderService.post(data.order, data.access),
        onSuccess: res => {
            console.log(res)
            handleSuccess()
            setLocalOrders(prev => prev ? [...prev, res] : [res])
            queryClient.setQueryData<Table[]>(TABLE_CACHE_KEY, prev => prev?.map( table => {
                if (table.id === res.table) {
                    console.log('found', table)
                    table.is_available = false
                    table.current_orders = table.current_orders ? [...table.current_orders, res] : [res]
                    console.log('before returning', table)
                    return table
                }
                return table
            }))
        },
        onError: err => {
            console.log(err)
            handleError()
        }
    })
}

export default usePostOrder