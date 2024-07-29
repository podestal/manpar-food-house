import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getTableService, {Table} from "../../services/api/tableService"
import { TABLE_CACHE_KEY } from "../../constants"

export interface UpdateTableData {
    access: string,
    table: Table
}

const useUpdateTable = (tableId: number | undefined): UseMutationResult<Table, Error, UpdateTableData> => {
    const tableService = getTableService(tableId)
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: UpdateTableData) => tableService.update(data.table, data.access),
        onSuccess: res => {
            console.log('res', res);
            queryClient.setQueryData<Table[]>(TABLE_CACHE_KEY, prev => prev?.map( table => table.id === res.id ? res : table))
        },
        onError: err => {
            console.log(err)
        }
        
    })
}

export default useUpdateTable