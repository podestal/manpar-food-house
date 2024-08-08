import { useLocation } from "react-router-dom"
import { Dish } from "../../services/api/dishServices"
import { OrderItem } from "../../services/api/orderItemService"
import { Order } from "../../services/api/orderService"
import RemoveOrderItem from "./RemoveOrderItem"
import { useState } from "react"

interface Props {
    orderItem: OrderItem
    dishes: Dish[]
    hideObs?: boolean
    order?: Order
}

const OrderItemCard = ({ orderItem, dishes, hideObs, order }: Props) => {

    if (!orderItem.id) return null

    const [loading, setLoading] = useState(false)

    const dish = dishes.find(dish => dish.id === orderItem.dish)

    if (!dish) return null

    const location = useLocation()

  return (
    <div className="w-full flex gap-4 justify-center">
        {!loading &&
        <>
        {order &&  
        <RemoveOrderItem 
            order={order}
            orderItem={orderItem}
            setLoading={setLoading}
        />}
        </>}
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
            {loading && <p className="text-red-500 my-4 text-center">Un Momento ...</p>}
            <div className="w-full flex items-center justify-between">
                <p className="text-xl font-bold">{orderItem.quantity} x {dish?.name}</p>
                <p className="text-xl">S/. {(orderItem.cost * orderItem.quantity).toFixed(2)}</p>
            </div>
            <div className="w-full flex flex-col justify-center items-start">
                <p className="text-xl">c/u: S/. {orderItem.cost}</p>
                {!hideObs && <p className="text-slate-300">{orderItem.observations ? `- ${orderItem.observations}` : ''}</p>}
            </div>
        </div>
        }
    </div>
  )
}

export default OrderItemCard