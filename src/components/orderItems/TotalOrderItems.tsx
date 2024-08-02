import { Divider } from "@tremor/react"
import useGetDishes from "../../hooks/dishes/useGetDishes"
import useGetOrderItems from "../../hooks/orderItem/useGetOrderItem"
import OrderItemCard from "./OrderItemCard"
import SumTotalOrderItems from "./SumTotalOrderItems"

interface Props {
    billId: number
}

const TotalOrderItems = ({ billId }: Props) => {

    if (!billId) return null

    const {data: orderItems, isLoading: billsLoading, isError: billsError, isSuccess: billSuccess} = useGetOrderItems({billId})

    const {data: dishes, isLoading: dishesLoading, isError: dishesError, isSuccess: dishSuccess} = useGetDishes()

    if (billsLoading || dishesLoading) return <p>Loading ...</p>

    if (billsError || dishesError) return <p>Error</p>

    if (billSuccess && dishSuccess)

  return (
    <div className="text-slate-50">
        <h2 className="text-4xl text-center my-8">Recibo</h2>
        <div className="flex flex-col justify-center items-center gap-6 ">
            <>{console.log('orderItems', orderItems)}</>
            {orderItems.map( orderItem => (
                <OrderItemCard 
                    key={orderItem.id}
                    orderItem={orderItem}
                    dishes={dishes}
                    hideObs={true}
                />
            ))}
            <Divider></Divider>
            <SumTotalOrderItems 
                dishes={dishes}
                orderItems={orderItems}
            />
        </div>

    </div>
  )
}

export default TotalOrderItems