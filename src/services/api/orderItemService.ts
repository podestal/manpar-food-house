import APIClient from "./apiClient"

export interface OrderItem {
    id?: number
    dish: number
    order: number | undefined
    observations: string
    quantity: number
    table: number
    bill: number
}

interface Props {
    orderId?: number
    orderItemId?: number
    bill?: number
}

const getOrderItemService = ({orderId, orderItemId, bill} : Props) => {

    let url = 'order-items/'
    if (orderId) {
        url = `order-items/?order=${orderId}&table=&bill=`
    }else if (orderItemId) {
        url = `order-items/${orderItemId}/`
    } else if (bill) {
        url = `order-items/?order=&table=&bill=${bill}`
    }
    return new APIClient<OrderItem>(url)
}

export default getOrderItemService