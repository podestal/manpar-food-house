import APIClient from "./apiClient"

export interface Order {
    id?: number
    table: number | undefined
    status: string
}

const getOrderService = (orderId?: number) => {
    const URL = orderId ? `orders/${orderId}/` : 'orders/'
    return new APIClient<Order>(URL)
}

export default getOrderService