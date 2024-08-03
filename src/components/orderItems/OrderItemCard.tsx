import { useLocation } from "react-router-dom"
import { Dish } from "../../services/api/dishServices"
import { OrderItem } from "../../services/api/orderItemService"
import { Order } from "../../services/api/orderService"
import { Icon } from "@tremor/react"
import { RiDeleteBin2Fill } from "@remixicon/react"

interface Props {
    orderItem: OrderItem
    dishes: Dish[]
    hideObs?: boolean
    order?: Order
}

const OrderItemCard = ({ orderItem, dishes, hideObs, order }: Props) => {

    const dish = dishes.find(dish => dish.id === orderItem.dish)

    if (!dish) return null

    const location = useLocation()

  return (
    <div className="w-full flex gap-4">
        {order?.status === 'P' && <Icon icon={RiDeleteBin2Fill} color="red"/>}
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