import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getTableService, { Table } from "../../services/api/tableService"
import { TABLE_CACHE_KEY } from "../../constants"

const useGetTables = (): UseQueryResult<Table[], Error> => {

    const tableService = getTableService()
    return useQuery({
        queryKey: TABLE_CACHE_KEY,
        queryFn: () => tableService.get(),
        staleTime: 1 * 60 * 1000,
    })
}

export default useGetTables