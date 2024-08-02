import APIClient from "./apiClient"

export interface Table {
    id?: number
    number?: number
    is_available: boolean 
    orders: number[]
    bill?: number
}

const getTableService = (tableId?: number) => {
    const URL = tableId ? `tables/${tableId}/` : 'tables/'
    return new APIClient<Table>(URL)
}

export default getTableService