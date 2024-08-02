import OrderItemForm from "./OrderItemForm"
import { Order } from "../../services/api/orderService"
import useCreateOrerItem from "../../hooks/orderItem/useCreateOrderItem"
import { Dish } from "../../services/api/dishServices"
import useErrorHandler from "../../store/errorHandling"
import { Table } from "../../services/api/tableService"

interface Props {
    order: Order
    dishes: Dish[]
    table: Table
}

const CreateOrderItem = ({ order, dishes, table }: Props) => {

    if (!order.id) return null
    const {handleSuccess, handleError} = useErrorHandler()
    const createOrderItem = useCreateOrerItem(order.id, handleSuccess, handleError)

  return (
    <OrderItemForm 
        order={order}
        createOrderItem={createOrderItem}
        dishes={dishes}
        table={table}
    />
  )
}

export default CreateOrderItem