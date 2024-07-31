import { useEffect } from "react"
import useGetOrderItems from "../../hooks/orderItem/useGetOrderItem"
import { Dish } from "../../services/api/dishServices"
import { Order } from "../../services/api/orderService"
import OrderItemCard from "./OrderItemCard"

interface Props {
    order: Order
    dishes: Dish[]
    setCanSendToKtichen: (value: boolean) => void
}

const OrderItems = ({ order, dishes, setCanSendToKtichen }: Props) => {

    if (!order.id) return null

    const {data: orderItems, isLoading, isError, error} = useGetOrderItems(order.id)

    useEffect(() => {
        if (orderItems && orderItems.length > 0) {
            setCanSendToKtichen(false)
        } else {
            setCanSendToKtichen(true)
        }
    }, [orderItems, setCanSendToKtichen])

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>Error: {error.message}</p>

  return (
    <>
        {orderItems?.map( orderItem => (
            <OrderItemCard 
                key={orderItem.id}
                orderItem={orderItem}
                dishes={dishes}
            />
        ))}
    </>
  )
}

export default OrderItems