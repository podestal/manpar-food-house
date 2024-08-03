import { Button } from "@tremor/react"
import { Order } from "../../services/api/orderService"
import useUpdateOrder from "../../hooks/orders/useUpdateOrder"
import useUserStore from "../../store/userStore"

interface Props {
    order: Order
    tableId: number | undefined
    canSendToKtichen: boolean
}

const SendOrderToKitchen = ({ order, tableId, canSendToKtichen }: Props) => {
    
    if (!order.id || !tableId) return null

    const access = useUserStore(s => s.access)
    const sendOrder = useUpdateOrder(order.id, tableId) 

    const handleClick = () => {
        if (access) {
            sendOrder.mutate({order: {table: order.table, status: 'S'}, access})
        }
    }

  return (
    <div>
        <Button disabled={canSendToKtichen} onClick={handleClick} color="green">Enviar a Cocina</Button>
    </div>
  )
}

export default SendOrderToKitchen