import { useLocation } from "react-router-dom"
import { Dish } from "../../services/api/dishServices"
import { OrderItem } from "../../services/api/orderItemService"
import { Order } from "../../services/api/orderService"
import { Icon } from "@tremor/react"
import { RiDeleteBin2Fill } from "@remixicon/react"
import useRemoveOrderItem from "../../hooks/orderItem/useRemoveOrderItem"
import useUserStore from "../../store/userStore"

interface Props {
    orderItem: OrderItem
    dishes: Dish[]
    hideObs?: boolean
    order?: Order
}

const OrderItemCard = ({ orderItem, dishes, hideObs, order }: Props) => {

    if (!orderItem.id || !order || !order.id) return null

    const dish = dishes.find(dish => dish.id === orderItem.dish)

    const access = useUserStore(s => s.access)

    const removeOrderItem = useRemoveOrderItem({orderItemId: orderItem.id, orderId: order.id, billId: orderItem.bill})

    if (!dish) return null

    const location = useLocation()

    const handleRemoveOrderItem = () => {
        if (access) {
            removeOrderItem.mutate({access})
        }
    }

  return (
    <div className="w-full flex gap-4">
        {order?.status === 'P' && <Icon className="hover:text-red-700 cursor-pointer" onDoubleClick={handleRemoveOrderItem} icon={RiDeleteBin2Fill} color="red"/>}
        {location.pathname === '/orders' 
        ? 
        <div className="w-full flex flex-col justify-center items-center gap-6">
            <div className="w-full flex items-center justify-between">
                <p className="text-xl font-bold">{dish?.name}</p>
                <p className="text-xl">{orderItem.quantity}</p>
            </div>
            <div className="w-full flex flex-col justify-center items-start">
                <p className="text-slate-300">{orderItem.observations ? `- ${orderItem.observations}` : ''}</p>
            </div>
        </div>
        : 
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex items-center justify-between">
                <p className="text-xl font-bold">{orderItem.quantity} x {dish?.name}</p>
                <p className="text-xl">S/. {(dish?.cost * orderItem.quantity).toFixed(2)}</p>
            </div>
            <div className="w-full flex flex-col justify-center items-start">
                <p className="text-xl">c/u: S/. {dish?.cost}</p>
                {!hideObs && <p className="text-slate-300">{orderItem.observations ? `- ${orderItem.observations}` : ''}</p>}
            </div>
        </div>
        }
    </div>
  )
}

export default OrderItemCard