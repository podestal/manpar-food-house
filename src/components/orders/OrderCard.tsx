import { Button } from "@tremor/react";
import { Order } from "../../services/api/orderService"

interface Props {
    order: Order
}

const OrderCard = ({ order }: Props) => {

    console.log('order',order);
    

  return (
    <div className={`w-full ${order.status === 'P' && 'bg-transparent border-2'} ${order.status === 'S' && 'bg-blue-700'}  flex flex-col justify-center items-center p-6 gap-6 rounded-3xl my-6 text-slate-200`}>
        <h2 className="text-5xl text-slate-50">Orden {order.id}</h2>
        <p>item1</p>   
        <p>item2</p>
        <p>item3</p>
        {order.status === 'P' && <Button color="green">Enviar</Button>}
    </div>
  )
}

export default OrderCard