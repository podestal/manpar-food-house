import APIClient from "./apiClient"

export interface Order {
    id?: number
    table: number | undefined
    status: string
}

interface Props {
    tableId?: number
    orderId?: number
}

const getOrderService = ({tableId, orderId}: Props) => {
    let url = 'orders/?table=&status=S'
    if (orderId) {
        url = `orders/${orderId}/`
    } else if (tableId) {
        url = `orders/?table=${tableId}&status=`
    }
    return new APIClient<Order>(url)
}

export default getOrderService