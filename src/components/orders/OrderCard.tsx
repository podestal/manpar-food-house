import { Button } from "@tremor/react";
import { Order } from "../../services/api/orderService"
import SendOrderToKitchen from "./SendOrderToKitchen";

interface Props {
    order: Order
    tableId: number
}

const OrderCard = ({ order, tableId }: Props) => {

  return (
    <div className={`w-full ${order.status === 'P' && 'bg-transparent border-2'} ${order.status === 'S' && 'bg-blue-700'}  flex flex-col justify-center items-center p-6 gap-6 rounded-3xl my-6 text-slate-200`}>
        <h2 className="text-5xl text-slate-50">Orden {order.id}</h2>
        {/* List of items */}
        {order.status === 'P' && <SendOrderToKitchen order={order} tableId={tableId}/>}
    </div>
  )
}

export default OrderCard