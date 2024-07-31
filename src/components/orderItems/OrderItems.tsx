import useGetOrderItems from "../../hooks/orderItem/useGetOrderItem"
import { Dish } from "../../services/api/dishServices"
import { Order } from "../../services/api/orderService"
import OrderItemCard from "./OrderItemCard"

interface Props {
    order: Order
    dishes: Dish[]
}

const OrderItems = ({ order, dishes }: Props) => {

    if (!order.id) return null

    const {data: orderItems, isLoading, isError, error} = useGetOrderItems(order.id)

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>Error: {error.message}</p>

  return (
    <>
        {orderItems?.map( orderItem => (
            <OrderItemCard 
                orderItem={orderItem}
                dishes={dishes}
            />
        ))}
    </>
  )
}

export default OrderItems