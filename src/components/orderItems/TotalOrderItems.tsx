import { Divider } from "@tremor/react"
import useGetDishes from "../../hooks/dishes/useGetDishes"
import OrderItemCard from "./OrderItemCard"
import SumTotalOrderItems from "./SumTotalOrderItems"
import { OrderItem } from "../../services/api/orderItemService"

interface Props {
    billId: number
    orderItems: OrderItem[]
}

const TotalOrderItems = ({ billId, orderItems }: Props) => {

    if (!billId) return null

    const {data: dishes, isLoading: dishesLoading, isError: dishesError, isSuccess: dishSuccess} = useGetDishes()

    if (dishesLoading) return <p>Loading ...</p>

    if (dishesError) return <p>Error</p>

    if (dishSuccess)

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