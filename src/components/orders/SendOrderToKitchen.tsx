import { Button } from "@tremor/react"
import { Order } from "../../services/api/orderService"
import useUpdateOrder from "../../hooks/orders/useUpdateOrder"
import useUserStore from "../../store/userStore"
import { useState } from "react"

interface Props {
    order: Order
    tableId: number | undefined
    canSendToKtichen: boolean
}

const SendOrderToKitchen = ({ order, tableId, canSendToKtichen }: Props) => {
    
    if (!order.id || !tableId) return null

    const [loading, setLoading] = useState(false)
    const access = useUserStore(s => s.access)
    const sendOrder = useUpdateOrder(order.id, tableId, setLoading) 

    const handleClick = () => {
        if (access) {
            sendOrder.mutate({order: {table: order.table, status: 'S'}, access})
        }
    }

  return (
    <div>
        <Button disabled={canSendToKtichen} onClick={handleClick} color="green">{loading ? 'Cargando ...' : 'Enviar a Cocina'}</Button>
    </div>
  )
}

export default SendOrderToKitchen