import { useEffect } from "react"
import usePostOrder from "../../hooks/orders/useCreateOrders"
import { Order } from "../../services/api/orderService"
import useErrorHandler from "../../store/errorHandling"
import OrderForm from "./OrderForm"
import Orders from "./Orders"

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

{/* {orders ? <OrderForm 
        show={show}
        setShow={setShow}
        createOrder={createOrder}
        tableId={tableId}
    /> 
    :
    <Orders 
    setShow={setShow}
    show={show}
    orders={orders}
/>} */}
    </>
  )
}

export default CreateOrder