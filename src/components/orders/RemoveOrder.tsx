import { Button } from "@tremor/react"
import useRemoveOrder from "../../hooks/orders/useRemoveOrder"
import useUserStore from "../../store/userStore"
import { OrderItem } from "../../services/api/orderItemService"

interface Props {
    orderId: number
    tableId: number | undefined
    orderItems: OrderItem[]
    setErrorOrder: (value: string) => void
}

const RemoveOrder = ({ orderId, tableId, orderItems, setErrorOrder }: Props) => {

    const removeOrder = useRemoveOrder(orderId, tableId)
    const access = useUserStore(s => s.access)

    const filteredOrderItems = orderItems.filter( orderItem => orderItem.order === orderId)

    const handleRemoveOrder = () => {

        if (filteredOrderItems.length > 0) {
            setErrorOrder('No se puede borrar una orden que contenga platos')
            setTimeout(() => {
                setErrorOrder('')
            }, 4000)
            return 
        }

        if (access) {
            removeOrder.mutate({access})
        }
    }

  return (
    <Button onDoubleClick={handleRemoveOrder} color="red">Eliminar Orden</Button>
  )
}

export default RemoveOrder