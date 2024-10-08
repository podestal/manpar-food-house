import useGetOrderItems from '../../hooks/orderItem/useGetOrderItem'
import useGetOrders from '../../hooks/orders/useGetOrders'
import useUserStore from '../../store/userStore'
import Loading from '../../utils/Loading'
import OrderCard from './OrderCard'

const OrdersKitchen = () => {

    const access = useUserStore(s => s.access)
    let normalizeAccess = ''
    if (access !== null) {
        normalizeAccess = access
    }

    const {data: orderItems, isLoading: orderItemsLoading, isError: orderItemsError, isSuccess: orderItemSuccess} = useGetOrderItems({getToday: true, access: normalizeAccess})
    
    const {data: orders, isLoading: orderLoading, isError: orderError, isSuccess: orderSuccess} =  useGetOrders({access: normalizeAccess})

    if (orderItemsLoading || orderLoading) return <Loading />

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
                orderItems={orderItems}
            />
            </div>
        ))} 
    </div>
    :
    <div className='w-full h-full flex justify-center items-center'>
        <h2 className='text-5xl w-[60%] text-center mt-10'>Aún no tienes órdenes ...</h2>
    </div>
    }
    </>
  )
}

export default OrdersKitchen