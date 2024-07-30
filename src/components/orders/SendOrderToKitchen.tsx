import { Button } from "@tremor/react"
import { Order } from "../../services/api/orderService"
import useUpdateOrder from "../../hooks/orders/useUpdateOrder"
import useUserStore from "../../store/userStore"

interface Props {
    order: Order
}

const SendOrderToKitchen = ({ order }: Props) => {

    if (!order.id) return null
    const access = useUserStore(s => s.access)
    const sendOrder = useUpdateOrder(order.id) 

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