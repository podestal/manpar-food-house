import OrderItemForm from "./OrderItemForm"
import { Order } from "../../services/api/orderService"
import useCreateOrerItem from "../../hooks/orderItem/useCreateOrderItem"
import { Dish } from "../../services/api/dishServices"
import useErrorHandler from "../../store/errorHandling"

interface Props {
    order: Order
    dishes: Dish[]
}

const CreateOrderItem = ({ order, dishes }: Props) => {

    if (!order.id) return null
    const {handleSuccess, handleError} = useErrorHandler()
    const createOrderItem = useCreateOrerItem(order.id, handleSuccess, handleError)

  return (
    <OrderItemForm 
        order={order}
        createOrderItem={createOrderItem}
        dishes={dishes}
    />
  )
}

export default CreateOrderItem