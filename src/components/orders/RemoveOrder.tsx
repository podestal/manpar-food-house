import { Button } from "@tremor/react"
import useRemoveOrder from "../../hooks/orders/useRemoveOrder"
import useUserStore from "../../store/userStore"

interface Props {
    orderId: number
    tableId: number | undefined
}

const RemoveOrder = ({ orderId, tableId }: Props) => {

    const removeOrder = useRemoveOrder(orderId, tableId)
    const access = useUserStore(s => s.access)

    const handleRemoveOrder = () => {
        if (access) {
            removeOrder.mutate({access})
        }
    }

  return (
    <Button onDoubleClick={handleRemoveOrder} color="red">Eliminar Orden</Button>
  )
}

export default RemoveOrder