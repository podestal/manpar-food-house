import { Order } from "../../services/api/orderService"
import SendOrderToKitchen from "./SendOrderToKitchen";
import OrderItems from "../orderItems/OrderItems";
import CreateOrderItem from "../orderItems/CreateOrderItem";
import useGetDishes from "../../hooks/dishes/useGetDishes";
import { Divider } from "@tremor/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useUpdateOrder from "../../hooks/orders/useUpdateOrder";
import useUserStore from "../../store/userStore";
import { Table } from "../../services/api/tableService";
import { OrderItem } from "../../services/api/orderItemService";
import useRemoveOrder from "../../hooks/orders/useRemoveOrder";

interface Props {
    order: Order
    table?: Table
    orderItems: OrderItem[]
}

const OrderCard = ({ order, table, orderItems }: Props) => {

    if (!order.id) return null

    const [canSendToKtichen, setCanSendToKtichen] = useState(true)

    const location = useLocation()

    const access = useUserStore( s => s.access)

    const {data: dishes, isLoading, isError, error, isSuccess} = useGetDishes()

    const updateOrder = useUpdateOrder(order.id)

    const removeOrder = useRemoveOrder(order.id)

    const handleUpdateOrder = () => {
        
        if (location.pathname === '/orders') {
            access && removeOrder.mutate({ access })
        }
    }

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <div onDoubleClick={handleUpdateOrder} className={`w-full ${order.status === 'P' && 'bg-transparent border-2'} ${order.status === 'S' && 'bg-blue-700'} ${order.status === 'C' && 'bg-green-600'} flex flex-col justify-center items-center p-6 gap-6 rounded-3xl my-6 text-slate-200`}>
        <h2 className="text-5xl text-slate-50">Orden {order.id}</h2>
        <OrderItems 
            order={order}
            dishes={dishes}
            setCanSendToKtichen={setCanSendToKtichen}
            orderItems={orderItems}
        />
        <Divider />
        {order.status === 'P' && table &&
        <CreateOrderItem 
            order={order}
            dishes={dishes}
            table={table}
        />}
        {order.status === 'P' && 
            <SendOrderToKitchen 
                order={order} 
                tableId={table?.id}
                canSendToKtichen={canSendToKtichen}
        />}
    </div>
  )
}

export default OrderCard