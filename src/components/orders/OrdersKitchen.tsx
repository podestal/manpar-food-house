import useGetOrders from '../../hooks/orders/useGetOrders'
import OrderCard from './OrderCard'

const OrdersKitchen = () => {

    const {data: orders, isLoading, isError, error, isSuccess} = useGetOrders()

    if (isLoading) return <p>Loading...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

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