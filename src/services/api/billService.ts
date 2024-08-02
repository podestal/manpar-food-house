import APIClient from "./apiClient"

export interface Bill {
    id?: number
    table: number
}

const getBillService = (billId?: number) => {
    const url = billId ? `bills/${billId}/` : 'bills/'
    return new APIClient<Bill>(url)
}

export default getBillService