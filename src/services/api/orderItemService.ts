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
}

interface Props {
    orderItemId?: number
    billId?: number
}

const getOrderItemService = ({ orderItemId, billId} : Props) => {

    const today = moment().format('YYYY-MM-DD')
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')

    let url = `order-items/?created_at__gte=${yesterday}&created_at__lte=${today}`
    if (orderItemId) {
        url = `order-items/${orderItemId}/`
    } else if (billId) {
        url = `order-items/?order=&table=&bill=${billId}`
    }
    return new APIClient<OrderItem>(url)
}

export default getOrderItemService