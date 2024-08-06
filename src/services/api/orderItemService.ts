import APIClient from "./apiClient"
import moment from "moment"

export interface OrderItem {
    id?: number
    dish: number
    order: number | undefined
    observations: string
    quantity: number
    table: number
    bill: number
    cost: number
}

interface Props {
    orderItemId?: number
    billId?: number
}

const getOrderItemService = ({ orderItemId, billId } : Props) => {

    const today = moment().format('YYYY-MM-DD')

    let url = `order-items/?order=&table=&bill=&created_at=${today}`
    
    if (orderItemId) {
        url = `order-items/${orderItemId}/`
    } else if (billId) {
        url = `order-items/?order=&table=&bill=${billId}`
    }
    return new APIClient<OrderItem>(url)
}

export default getOrderItemService