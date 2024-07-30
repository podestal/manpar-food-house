import { Order } from "../../services/api/orderService"

interface Props {
    order: Order
}

const OrderCard = ({ order }: Props) => {
  return (
    <div className="w-full bg-amber-600  flex flex-col justify-center items-center p-6 gap-6 rounded-3xl my-6 text-slate-200">
        <h2 className="text-5xl text-slate-50">Orden {order.id}</h2>
        <p>item1</p>   
        <p>item2</p>
        <p>item3</p>
    </div>
  )
}

export default OrderCard