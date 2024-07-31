import { Order } from "../../services/api/orderService"
import SendOrderToKitchen from "./SendOrderToKitchen";
import useGetOrderItems from "../../hooks/orderItem/useGetOrderItem";
import OrderItemCard from "../orderItems/OrderItemCard";

interface Props {
    order: Order
    tableId: number
}

const OrderCard = ({ order, tableId }: Props) => {

    if (!order.id) return null

    const {data: orderItems, isLoading, isError, error} = useGetOrderItems(order.id)

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>Error: {error.message}</p>

  return (
    <div className={`w-full ${order.status === 'P' && 'bg-transparent border-2'} ${order.status === 'S' && 'bg-blue-700'}  flex flex-col justify-center items-center p-6 gap-6 rounded-3xl my-6 text-slate-200`}>
        <h2 className="text-5xl text-slate-50">Orden {order.id}</h2>
        {orderItems?.map( orderItem => (
            <OrderItemCard 
                orderItem={orderItem}
            />
        ))}
        {order.status === 'P' && <SendOrderToKitchen order={order} tableId={tableId}/>}
    </div>
  )
}

export default OrderCard