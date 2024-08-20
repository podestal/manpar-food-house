import { Order } from "../../services/api/orderService"
import SendOrderToKitchen from "./SendOrderToKitchen";
import OrderItems from "../orderItems/OrderItems";
import CreateOrderItem from "../orderItems/CreateOrderItem";
import useGetDishes from "../../hooks/dishes/useGetDishes";
import { Button, Callout, Divider } from "@tremor/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useUserStore from "../../store/userStore";
import { Table } from "../../services/api/tableService";
import { OrderItem } from "../../services/api/orderItemService";
import useRemoveOrder from "../../hooks/orders/useRemoveOrder";
import RemoveOrder from "./RemoveOrder";
import OrderTimer from "./OrderTimer";
import useUpdateOrder from "../../hooks/orders/useUpdateOrder";

interface Props {
    order: Order
    table?: Table
    orderItems: OrderItem[]
}

const OrderCard = ({ order, table, orderItems }: Props) => {

    if (!order.id) return null

    const [canSendToKtichen, setCanSendToKtichen] = useState(true)

    const [ErrorOrder, setErrorOrder] = useState('')
    const [loading, setLoading] = useState(false)

    // Background
    const [background, setBackground] = useState('blue-700')

    const location = useLocation()

    const access = useUserStore( s => s.access)

    const {data: dishes, isLoading, isError, error, isSuccess} = useGetDishes()

    const removeOrder = useRemoveOrder({orderId: order.id, tableId: order.table, setLoading})
    const updateOrder = useUpdateOrder(order.id, order.table)

    const handleClick = () => {
        
        if (location.pathname === '/orders') {
            access && removeOrder.mutate({ access })
        }
        // if (location.pathname === '/tables') {
        //     access && updateOrder.mutate({order: {...order, status: 'P'}, access })
        // }
    }

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <>
    <div onDoubleClick={handleClick} className={`w-full ${order.status === 'P' && 'bg-transparent border-2'} ${order.status === 'S' && `bg-${background} cursor-pointer`}  flex flex-col justify-center items-center p-6 gap-6 rounded-3xl my-6 text-slate-200`}>
        {ErrorOrder && <Callout color='red' title="Error">{ErrorOrder}</Callout>}
        {loading 
        ? 
        <h2 className="h-[180px] text-4xl text-slate-50 text-center">Un momento ...</h2>
        : 
        <>
        {order.status === 'S' && location.pathname === '/tables' &&
        <div className="w-full flex justify-start">
            <Button onDoubleClick={() => {
                access && updateOrder.mutate({order: {...order, status: 'P'}, access })
            }} color="red">Modificar Order</Button>
        </div> }
        {order.status !== 'P' && 
        <div className="flex justify-center items-center gap-4">
            <h2 className="text-3xl text-slate-50 text-center">Orden {order.id}</h2>
            <OrderTimer 
                order={order}
                setBackground={setBackground}
            />
        </div>}
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
            <div className="w-full flex justify-center items-center gap-6">
            <SendOrderToKitchen 
                order={order} 
                tableId={table?.id}
                canSendToKtichen={canSendToKtichen}
            />
            <RemoveOrder 
                orderId={order.id}
                tableId={table?.id}
                orderItems={orderItems}
                setErrorOrder={setErrorOrder}
            />
            </div>
        }
        </>
        }
    </div>
    </>
  )
}

export default OrderCard