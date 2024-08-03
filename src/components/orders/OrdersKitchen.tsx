import useGetOrderItems from '../../hooks/orderItem/useGetOrderItem'
import useGetOrders from '../../hooks/orders/useGetOrders'
import OrderCard from './OrderCard'

const OrdersKitchen = () => {

    const {data: orderItems, isLoading: orderItemsLoading, isError: orderItemsError, isSuccess: orderItemSuccess} = useGetOrderItems({billId: table.bill})

    const {data: orders, isLoading: orderLoading, isError: orderError, error, isSuccess: orderSuccess} =  useGetOrders(table.id)

    if (orderItemsLoading || orderLoading) return <p>Loading ...</p>

    if (orderItemsError || orderError) return <p>Error</p>

    if (orderItemSuccess && orderSuccess)

  return (
    <>
    {orders.length > 0 
    ?
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10'>
        {orders.map( order => (
            <div key={order.id}>
            <OrderCard 
                order={order}
            />
            </div>
        ))} 
    </div>
    :
    <div className='w-full h-full flex justify-center items-center'>
        <h2 className='text-5xl'>Aún no tienes órdenes ...</h2>
    </div>
    }
    </>
  )
}

export default OrdersKitchen