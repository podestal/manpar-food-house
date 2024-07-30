import Panel from "../../utils/Panel"
import { Button, Callout } from "@tremor/react"
import { UseMutationResult } from "@tanstack/react-query"
import { Order } from "../../services/api/orderService"
import { PostOrderData } from "../../hooks/orders/useCreateOrders"
import useUserStore from "../../store/userStore"
import { useState } from "react"
import useErrorHandler from "../../store/errorHandling"

interface Props {
    createOrder: UseMutationResult<Order, Error, PostOrderData>
    tableId: number | undefined
}

const OrderForm = ({ createOrder, tableId }: Props) => {

    const access = useUserStore(s => s.access)
    const {error, success} = useErrorHandler()
    const [loading, setLoading] = useState(false)

    const handleCreateOrder = () => {
        setLoading(true)
        if (access) {
            createOrder.mutate({ order: {table: tableId, status: 'P'}, access })
        }
    }

  return (
    <div className="flex flex-col justify-center items-center gap-6">
        {error && <Callout title="Error" color='red'>Ocurrió un error, inténtelo más tarde</Callout>}
        {loading && <p className="text-slate-50">Loading...</p>}
        <div className="w-full flex justify-center items-center gap-10 my-6">
            <Button onClick={handleCreateOrder} color="blue">Nueva Orden</Button>
        </div>
    </div>
  )
}

export default OrderForm