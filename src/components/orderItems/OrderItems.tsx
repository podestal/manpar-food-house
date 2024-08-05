import { useEffect } from "react"
import { Dish } from "../../services/api/dishServices"
import { Order } from "../../services/api/orderService"
import OrderItemCard from "./OrderItemCard"
import { OrderItem } from "../../services/api/orderItemService"

interface Props {
    order: Order
    dishes: Dish[]
    setCanSendToKtichen: (value: boolean) => void
    orderItems: OrderItem[]
}

const OrderItems = ({ order, dishes, setCanSendToKtichen, orderItems }: Props) => {

    if (!order.id) return null

    useEffect(() => {
        const items = orderItems?.filter(orderItem => orderItem.order === order.id)
        console.log(items);
        console.log('order.id', order.id);
        
        
        
        if (orderItems && orderItems.length > 0) {
            setCanSendToKtichen(false)
        } else {
            setCanSendToKtichen(true)
        }
    }, [orderItems, setCanSendToKtichen])

  return (
    <>
        {orderItems
            ?.filter(orderItem => orderItem.order === order.id)
            ?.map( orderItem => (
            <OrderItemCard 
                key={orderItem.id}
                orderItem={orderItem}
                dishes={dishes}
                order={order}
            />
        ))}
    </>
  )
}

export default OrderItems