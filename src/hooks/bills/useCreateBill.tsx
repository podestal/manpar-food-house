import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getBillService, {Bill} from "../../services/api/billService"
import { TABLE_CACHE_KEY } from "../../constants"
import { Table } from "../../services/api/tableService"

export interface CreateBillData {
    access: string
    bill: Bill
}

const useCreateBill = (tableId: number): UseMutationResult<Bill, Error, CreateBillData> => {
    const billService = getBillService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateBillData) => billService.post(data.bill, data.access),
        onSuccess: res => {
            console.log(res)
            queryClient.setQueryData<Table[]>(TABLE_CACHE_KEY, prev => prev?.map( table => {
                if (table.id === tableId) {
                    table.bill = res.id
                }
                return table
            }))
        },
        onError: err => console.log(err)
    })
}

export default useCreateBill
