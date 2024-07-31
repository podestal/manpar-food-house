import APIClient from "./apiClient"

export interface OrderItem {
    id?: number
    dish: number
    order: number | undefined
    observations: string
    quantity: number
}

const getOrderItemService = (orderId: number, orderItemId?: number) => {
    const URL = orderItemId ? `order-items/${orderItemId}/` : `/order-items/?order=${orderId}`
    return new APIClient<OrderItem>(URL)
}

export default getOrderItemService