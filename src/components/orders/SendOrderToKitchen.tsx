import { Button } from "@tremor/react"
import { Order } from "../../services/api/orderService"
import useUpdateOrder from "../../hooks/orders/useUpdateOrder"
import useUserStore from "../../store/userStore"

interface Props {
    order: Order
    tableId: number
}

const SendOrderToKitchen = ({ order, tableId }: Props) => {

    if (!order.id) return null
    const access = useUserStore(s => s.access)
    const sendOrder = useUpdateOrder(order.id, tableId) 

    const handleClick = () => {
        if (access) {
            sendOrder.mutate({order: {table: order.table, status: 'S'}, access})
        }
    }

  return (
    <div>
        <Button onClick={handleClick} color="green">Enviar</Button>
    </div>
  )
}

export default SendOrderToKitchen