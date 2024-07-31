import { Dish } from "../../services/api/dishServices"
import { OrderItem } from "../../services/api/orderItemService"

interface Props {
    orderItem: OrderItem
    dishes: Dish[]
}

const OrderItemCard = ({ orderItem, dishes }: Props) => {

    const dish = dishes.find(dish => dish.id === orderItem.dish)

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
        <div className="w-full flex items-center justify-between">
            <p className="text-xl font-bold">{dish?.name}</p>
            <p className="text-xl">{orderItem.quantity}</p>
        </div>
        <div className="w-full flex justify-start">
            <p className="text-slate-300">{orderItem.observations ? `- ${orderItem.observations}` : ''}</p>
        </div>
    </div>
  )
}

export default OrderItemCard