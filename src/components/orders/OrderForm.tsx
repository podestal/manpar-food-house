import Panel from "../../utils/Panel"
import { Button, Callout } from "@tremor/react"
import { UseMutationResult } from "@tanstack/react-query"
import { Order } from "../../services/api/orderService"
import { PostOrderData } from "../../hooks/orders/useCreateOrders"
import useUserStore from "../../store/userStore"
import { useState } from "react"
import useErrorHandler from "../../store/errorHandling"

interface Props {
    show: boolean
    setShow: (value: boolean) => void
    createOrder: UseMutationResult<Order, Error, PostOrderData>
    tableId: number | undefined
}

const OrderForm = ({ show, setShow, createOrder, tableId }: Props) => {

    const access = useUserStore(s => s.access)
    const {error, success} = useErrorHandler()
    const [loading, setLoading] = useState(false)

    const handleCreateOrder = async () => {
        setLoading(true)
        if (access) {
            try {
                await createOrder.mutateAsync({ order: {table: tableId, status: 'P'}, access })
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
    }

  return (
    <Panel
        show={show}
        setShow={setShow}
    >
        <div className="flex flex-col justify-center items-center gap-6">
            <h2 className="text-3xl text-slate-50">Nueva Orden</h2>
            {error && <Callout title="Error" color='red'>Ocurrió un error, inténtelo más tarde</Callout>}
            {loading && <p className="text-slate-50">Loading...</p>}
            <div className="w-full flex justify-center items-center gap-10 my-6">
                <Button onClick={handleCreateOrder} color="blue">Crear</Button>
            </div>
        </div>
    </Panel>
  )
}

export default OrderForm