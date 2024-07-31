import OrderItemForm from "./OrderItemForm"
import { Order } from "../../services/api/orderService"
import useCreateOrerItem from "../../hooks/orderItem/useCreateOrderItem"

interface Props {
    order: Order
}

const CreateOrderItem = ({ order }: Props) => {

    const createOrderItem = useCreateOrerItem()

  return (
    <OrderItemForm 
        order={order}
        createOrderItem={createOrderItem}
    />
  )
}

export default CreateOrderItem