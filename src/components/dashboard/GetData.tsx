import useGetDishes from '../../hooks/dishes/useGetDishes'
import useGetOrderItems from '../../hooks/orderItem/useGetOrderItem'
import useUserStore from '../../store/userStore'
import Loading from '../../utils/Loading'
import OrderItems from './OrderItems'

const GetData = () => {

    const access = useUserStore(s => s.access)
    let normalizedAccess = ''
    if (access !== null) {
        normalizedAccess = access
    }

    const { 
        data: orderItems, 
        isLoading: orderItemsDataIsLoading,
        isError: orderItemsDataIsError,
        isSuccess: orderItemsDataIsSuccess, } = useGetOrderItems({getToday: true, access: normalizedAccess})

    const {
        data: dishes,
        isLoading: dishesDataIsLoading,
        isError: dishesDataIsError,
        isSuccess: dishesDataIsSuccess, } = useGetDishes()
    
    if (orderItemsDataIsLoading || dishesDataIsLoading) return <Loading />

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