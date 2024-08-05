import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getBillService, {Bill} from "../../services/api/billService"
import { getOrderItemCacheKey } from "../../constants"
import { OrderItem } from "../../services/api/orderItemService"
import { TABLE_CACHE_KEY } from "../../constants"
import { Table } from "../../services/api/tableService"

export interface DeleteBillData {
    access: string
}

const useRemoveBill = (
        billId: number, 
        tableId: number, 
        setSuccess: (value:string) => void, 
        setError: (value:string) => void, 
        setShow: (value:boolean) => void, 
        setLoading: (value:boolean) => void): UseMutationResult<Bill, Error, DeleteBillData> => {
    const ORDERITEM_CACHE_KEY = getOrderItemCacheKey({billId})
    const queryClient = useQueryClient()
    const billService = getBillService(billId)
    return useMutation({
        mutationFn: (data: DeleteBillData) => billService.delete(data.access),
        onMutate: () => setLoading(true),
        onSuccess: () => {
            queryClient.setQueryData<OrderItem[]>(ORDERITEM_CACHE_KEY, prev => prev?.filter( orderItem => orderItem.bill !== billId))
            queryClient.setQueryData<Table[]>(TABLE_CACHE_KEY, prev => prev?.map( table => {
                if (table.id === tableId) {
                    table.bill = undefined
                }
                return table
            }))
            setSuccess('La mesa se ha cerrado')
            setShow(false)
            setTimeout(() => {
                setSuccess('')
            },4000)
            setError('')
        },
        onError: err => {
            console.log(err)
            setError('Ocurrió un error en el servidor, inténtelo nuevamente')
            setTimeout(() => {
                setError('')
            },4000)
            setSuccess('')
        },
        onSettled: () => setLoading(false)
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
