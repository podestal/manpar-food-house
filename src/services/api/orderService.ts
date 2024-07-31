import APIClient from "./apiClient"

export interface Order {
    id?: number
    table: number | undefined
    status: string
}

const getOrderService = ( tableId: number, orderId?: number) => {
    const URL = tableId === 0 ? `orders/${orderId}/` : `orders/?table=${tableId}&status=`
    return new APIClient<Order>(URL)
}

export default getOrderService