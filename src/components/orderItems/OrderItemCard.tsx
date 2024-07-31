import { OrderItem } from "../../services/api/orderItemService"

interface Props {
    orderItem: OrderItem
}

const OrderItemCard = ({ orderItem }: Props) => {

    const dish:any = orderItem.dish 

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
        <div className="w-full flex items-center justify-between">
            <p className="text-xl font-bold">{dish.name}</p>
            <p className="text-xl">{dish.cost}</p>
        </div>
        <div className="w-full flex justify-start">
            <p className="text-slate-300">{orderItem.observations ? `- ${orderItem.observations}` : ''}</p>
        </div>
    </div>
  )
}

export default OrderItemCard