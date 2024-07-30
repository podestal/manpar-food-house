import OrderItemForm from "./OrderItemForm"
import { Order } from "../../services/api/orderService"

interface Props {
    order: Order
}

const CreateOrderItem = ({ order }: Props) => {
  return (
    <OrderItemForm 
        order={order}
    />
  )
}

export default CreateOrderItem