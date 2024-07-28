import APIClient from "./apiClient"

export interface Table {
    id?: number
    number: number
    is_available: boolean 
}

const tableService = new APIClient<Table>('tables/')

export default tableService