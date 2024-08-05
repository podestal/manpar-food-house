import { Divider } from "@tremor/react"
import { Dish } from "../../services/api/dishServices"
import { OrderItem } from "../../services/api/orderItemService"
import SaleItem from "./SaleItem"

interface Props {
    orderItems: OrderItem[]
    dishes: Dish[]
}

export interface MergeData {
    dishName: string
    soldQuantity: number
    sales: number
}

const OrderItems = ({ orderItems, dishes }: Props) => {

    const dishData: Record<number, MergeData> = {}
    let totalSales = 0
    orderItems.forEach( orderItem => {
        
        const dish = dishes.find(dish => dish.id === orderItem.dish)
        if (dish) {
            if (dish.id) {
                if (!dishData[dish.id]) {
                    dishData[dish.id] = {
                        dishName: dish.name,
                        soldQuantity: 0,
                        sales: 0
                    }
                }
                dishData[dish.id].soldQuantity += orderItem.quantity
                dishData[dish.id].sales += dish.cost * orderItem.quantity
                totalSales += dish.cost * orderItem.quantity
            }
        }
    })

  return (
    <div className="w-[1260px] mx-auto ">
        <div className="px-10 py-10 grid grid-cols-4 text-3xl  text-center gap-6">
            <h2 className="text-left col-span-2">Nombre del Plato</h2>
            <p className="">Cantidad</p>
            <p className="text-right">Monto</p>
        </div>
        {Object.values(dishData).map( formattedDish => (
            <SaleItem 
                key={formattedDish.dishName}
                formattedDish={formattedDish}
            />
        ))}
        <Divider></Divider>
        <div className="flex justify-end items-center gap-2 py-10 mx-10">
            <p className="text-xl font-bold">Total:</p>
            <p className="text-green-500 font-bold">S/. {(totalSales).toFixed(2)}</p>
        </div>
    </div>
  )
}

export default OrderItems