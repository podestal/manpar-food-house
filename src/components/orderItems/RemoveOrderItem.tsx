import { Icon } from "@tremor/react"
import { Order } from "../../services/api/orderService"
import { RiDeleteBin2Fill } from "@remixicon/react"
import useUserStore from "../../store/userStore"
import useRemoveOrderItem from "../../hooks/orderItem/useRemoveOrderItem"
import { OrderItem } from "../../services/api/orderItemService"

interface Props {
    order: Order
    orderItem: OrderItem
    setLoading: (value: boolean) => void
}

const RemoveOrderItem = ({ order, orderItem, setLoading }: Props) => {

    if (!orderItem.id) return null

    const access = useUserStore(s => s.access)

    const removeOrderItem = useRemoveOrderItem({orderItemId: orderItem.id, orderId: order?.id, billId: orderItem.bill, setLoading})

    const handleRemoveOrderItem = () => {
        if (access) {
            removeOrderItem.mutate({access})
        }
    }

  return (
    <>
        
        {order?.status === 'P' && <Icon className="hover:text-red-700 cursor-pointer" onDoubleClick={handleRemoveOrderItem} icon={RiDeleteBin2Fill} color="red"/>}
    </>
  )
}

export default RemoveOrderItem