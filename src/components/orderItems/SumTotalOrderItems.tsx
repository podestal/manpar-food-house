import { OrderItem } from "../../services/api/orderItemService"
import { Dish } from "../../services/api/dishServices"

interface Props {
    orderItems: OrderItem[]
    dishes: Dish[]
}

const SumTotalOrderItems = ({orderItems, dishes}: Props) => {

    let sum = 0
    orderItems.forEach(orderItem => {
        const dish = dishes.find(dish => dish.id === orderItem.dish)
        if (dish) {
            sum += dish?.cost * orderItem.quantity
        }
    })

  return (
    <div className="mb-6 w-full flex justify-center items-center gap-6">
        <p className="text-2xl font-bold">Total: </p>
        <p className="text-2xl text-green-500 ">S/.{(sum).toFixed(2)}</p>
    </div>
  )
}

export default SumTotalOrderItems