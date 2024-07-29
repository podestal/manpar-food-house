import Panel from "../../utils/Panel"
import { Button } from "@tremor/react"
import { UseMutationResult } from "@tanstack/react-query"
import { Order } from "../../services/api/orderService"
import { PostOrderData } from "../../hooks/orders/useCreateOrders"
import useUserStore from "../../store/userStore"
import { Table } from "../../services/api/tableService"
import { UpdateTableData } from "../../hooks/tables/useUpdateTable"

interface Props {
    show: boolean
    setShow: (value: boolean) => void
    createOrder: UseMutationResult<Order, Error, PostOrderData>
    updateTable: UseMutationResult<Table, Error, UpdateTableData>
    tableId: number | undefined
}

const OrderForm = ({ show, setShow, createOrder, updateTable, tableId }: Props) => {

    const access = useUserStore(s => s.access)

    const handleCreateOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (access) {
            try {
                await createOrder.mutateAsync({ order: {table: tableId, status: 'P'}, access })
                await updateTable.mutateAsync({ table: {is_available: false}, access })
            }
            catch (error) {
                console.log(error)
            }
        }
    }

  return (
    <Panel
        show={show}
        setShow={setShow}
    >
        <form onSubmit={handleCreateOrder} className="flex flex-col justify-center items-center gap-6">
            <h2 className="text-3xl text-slate-50">Nueva Orden</h2>
            <div className="w-full flex justify-center items-center gap-10 my-6">
                <Button color="green">Crear</Button>
                <Button color="blue">Volver</Button>
            </div>
        </form>
    </Panel>
  )
}

export default OrderForm