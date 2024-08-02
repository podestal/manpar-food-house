import { Dish } from "../services/api/dishServices"
import { OrderItem } from "../services/api/orderItemService"
import { Order } from "../services/api/orderService"

interface Receipt {
    dishName: string
    cost: number
    quantity: number
    itemTotal: number
}

const getReceipt = (orders: Order[], orderItems: OrderItem[], dishes: Dish[]): {receipts: Receipt[], total: number}  => {

    const receipts: Receipt[] = []
    let total: number = 0
    orders.forEach(order => {
        orderItems.filter( orderItem => orderItem.order === order.id)
        orderItems.forEach( orderItem => {
            const dish = dishes.find(dish => orderItem.dish === dish.id)
            if (dish) {
                const itemTotal = dish.cost * orderItem.quantity
                total =+ itemTotal
                receipts.push({
                    dishName: dish.name,
                    cost: dish.cost,
                    quantity: orderItem.quantity,
                    itemTotal,
                })
            }
        })
    })

    return {receipts, total}
}

export default getReceipt