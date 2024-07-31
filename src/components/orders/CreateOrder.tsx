import { Button } from "@tremor/react"
import usePostOrder from "../../hooks/orders/useCreateOrders"
import { Order } from "../../services/api/orderService"
import useErrorHandler from "../../store/errorHandling"
import OrderForm from "./OrderForm"
import { useEffect } from "react"

interface Props {
    tableId: number
    orders: Order[] | undefined
}

const CreateOrder = ({ tableId, orders }: Props) => {

    const {handleError, handleSuccess} = useErrorHandler()

    let isThereAnyPendingOrder = orders?.find(order => order.status === 'P')

    const createOrder = usePostOrder(tableId, handleSuccess, handleError)

  return (
    <>  
        {isThereAnyPendingOrder
        ?
        <div className="w-full flex justify-center items-center">
            <Button color="blue" disabled={true}>Nueva Orden</Button>
        </div>
        :
        <OrderForm 
            createOrder={createOrder}
            tableId={tableId}
        /> 
        }

    </>
  )
}

export default CreateOrder