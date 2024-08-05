import useGetDishes from '../../hooks/dishes/useGetDishes'
import useGetOrderItems from '../../hooks/orderItem/useGetOrderItem'
import OrderItems from './OrderItems'

const GetData = () => {

    const { 
        data: orderItems, 
        isLoading: orderItemsDataIsLoading,
        isError: orderItemsDataIsError,
        isSuccess: orderItemsDataIsSuccess, } = useGetOrderItems({getToday: true})

    const {
        data: dishes,
        isLoading: dishesDataIsLoading,
        isError: dishesDataIsError,
        isSuccess: dishesDataIsSuccess, } = useGetDishes()
    
    if (orderItemsDataIsLoading || dishesDataIsLoading) return <p>Cargando ...</p>

    if (orderItemsDataIsError || dishesDataIsError) return <p>Error</p>

    if (orderItemsDataIsSuccess && dishesDataIsSuccess)
    
  return (
    <>
        <OrderItems 
            orderItems={orderItems}
            dishes={dishes}
        />
    </>
  )
}

export default GetData