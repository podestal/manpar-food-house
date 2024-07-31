import OrderItemForm from "./OrderItemForm"
import { Order } from "../../services/api/orderService"
import useCreateOrerItem from "../../hooks/orderItem/useCreateOrderItem"
import { Dish } from "../../services/api/dishServices"

interface Props {
    order: Order
    dishes: Dish[]
}

const CreateOrderItem = ({ order }: Props) => {

    if (!order.id) return null
    const createOrderItem = useCreateOrerItem(order.id)

  return (
    <OrderItemForm 
        order={order}
        createOrderItem={createOrderItem}
    />
  )
}

export default CreateOrderItem