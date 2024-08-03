import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getBillService, {Bill} from "../../services/api/billService"
import { getOrderItemCacheKey } from "../../constants"
import { OrderItem } from "../../services/api/orderItemService"
import { TABLE_CACHE_KEY } from "../../constants"
import { Table } from "../../services/api/tableService"

export interface DeleteBillData {
    access: string
}

const useRemoveBill = (billId: number, tableId: number, setSuccess: (value:boolean) => void, setError: (value:boolean) => void): UseMutationResult<Bill, Error, DeleteBillData> => {
    const ORDERITEM_CACHE_KEY = getOrderItemCacheKey({billId})
    const queryClient = useQueryClient()
    const billService = getBillService(billId)
    return useMutation({
        mutationFn: (data: DeleteBillData) => billService.delete(data.access),
        onSuccess: () => {
            queryClient.setQueryData<OrderItem[]>(ORDERITEM_CACHE_KEY, prev => prev?.filter( orderItem => orderItem.bill !== billId))
            queryClient.setQueryData<Table[]>(TABLE_CACHE_KEY, prev => prev?.map( table => {
                if (table.id === tableId) {
                    table.bill = undefined
                }
                return table
            }))
            setSuccess(true)
            setError(false)
        },
        onError: err => {
            console.log(err)
            setError(true)
            setSuccess(false)
        }
    })
}

export default useRemoveBill

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
