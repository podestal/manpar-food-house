import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getOrderService, { Order } from "../../services/api/orderService"
import { getOrderCacheKey } from "../../constants"

export interface DeleteOrderData {
    access: string
}

const useRemoveOrder = (orderId: number): UseMutationResult<Order, Error, DeleteOrderData> => {
    const queryClient = useQueryClient()
    const orderService = getOrderService({orderId})
    const ORDER_CACHE_KEY = getOrderCacheKey()
    return useMutation({
        mutationFn: (data: DeleteOrderData) => orderService.delete(data.access),
        onSuccess: () => {
            queryClient.setQueryData<Order[]>(ORDER_CACHE_KEY, prev => prev?.filter(order => order.id !== orderId))
        },
        onError: err => console.log(err)
    })
}

export default useRemoveOrder

// import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
// import getDishService, { Dish,  } from "../../services/api/dishServices"
// import { DISH_CACHE_KEY } from "../../constants"

// export interface DeletePostData {
//     access: string
// }

// const useRemoveDish = (dishId: number | undefined): UseMutationResult<Dish, Error, DeletePostData> => {
//     const queryClient = useQueryClient()
//     const dishService = getDishService(dishId)
//     return useMutation({
//         mutationFn: (data: DeletePostData) => dishService.delete(data.access),
//         onSuccess: () => {
//             queryClient.setQueryData<Dish[]>(DISH_CACHE_KEY, prev => prev?.filter(dish => dish.id !== dishId))
//         },
//         onError: err => console.log(err)
//     })
// }

// export default useRemoveDish
