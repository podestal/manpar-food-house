import usePostOrder from "../../hooks/orders/useCreateOrders"
import { Order } from "../../services/api/orderService"
import useErrorHandler from "../../store/errorHandling"
import OrderForm from "./OrderForm"

interface Props {
    tableId: number | undefined
    setLocalOrders: React.Dispatch<React.SetStateAction<Order[]>>
}

const CreateOrder = ({ tableId, setLocalOrders }: Props) => {

    const {handleError, handleSuccess} = useErrorHandler()

    const createOrder = usePostOrder(handleSuccess, handleError, setLocalOrders)

  return (
    <>
        <OrderForm 
            createOrder={createOrder}
            tableId={tableId}
        /> 
    </>
  )
}

export default CreateOrder