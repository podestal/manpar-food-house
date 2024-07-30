import { Button, NumberInput, TextInput } from "@tremor/react"
import { RiSearch2Line } from "@remixicon/react"
import { Order } from "../../services/api/orderService"

interface Props {
    order: Order
}


const OrderItemForm = ({ order }: Props) => {
    

  return (
    <form className="flex flex-col justify-center items-center gap-6">
        <>{console.log('order', order)}</>
        <TextInput 
            placeholder="Plato"
            icon={RiSearch2Line}
        />
        <TextInput 
            placeholder="Observaciones"
        />
        <div className="flex flex-col justify-center items-center w-[300px] max-lg:w-[200px] gap-6">
            <NumberInput 
                placeholder="Cantidad"
            />
        </div>
        <div className="w-full flex justify-center items-center gap-10 my-6">
            <Button color="blue">Agregar Plato</Button>
        </div>
    </form>
  )
}

export default OrderItemForm