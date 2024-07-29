import APIClient from "./apiClient"
import { Order } from "./orderService"

export interface Table {
    id?: number
    number?: number
    is_available: boolean 
    current_orders?: Order[]
}

const getTableService = (tableId?: number) => {
    const URL = tableId ? `tables/${tableId}/` : 'tables/'
    return new APIClient<Table>(URL)
}

export default getTableService