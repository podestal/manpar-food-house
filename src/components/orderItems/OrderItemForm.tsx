import { Button, NumberInput, TextInput, Textarea } from "@tremor/react"
import { RiSearch2Line } from "@remixicon/react"
import { Order } from "../../services/api/orderService"
import { z } from 'zod'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js"
import { UseMutationResult } from "@tanstack/react-query"
import { CreateOrderItemData } from "../../hooks/orderItem/useCreateOrderItem"
import { OrderItem } from "../../services/api/orderItemService"
import useUserStore from "../../store/userStore"

const schema = z.object({
    dish: z.string().min(1, { message: 'Porfavor ingrese un plato' }),
    observations: z.string(),
    quantity: z.string().min(1, { message: 'Porfavor ingrese una cantidad mayor a 0' })
})

type FormData = z.infer<typeof schema>

interface Props {
    order: Order
    createOrderItem: UseMutationResult<OrderItem, Error, CreateOrderItemData>
}

const OrderItemForm = ({ order, createOrderItem }: Props) => {

    const access = useUserStore(s => s.access)

    const {register, handleSubmit} = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const onSubmit = (data: FieldValues) => {
        if (access) {
            createOrderItem.mutate({orderItem: {dish: parseInt(data.dish), order: order.id, observations: data.observations, quantity: parseInt(data.quantity)}, access})
        }
    }

    const onError = (error: any) => {
        console.log(error)
        
    }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col justify-center items-center w-[300px] max-lg:w-[200px] gap-6">
            <TextInput 
                placeholder="Plato"
                icon={RiSearch2Line}
                {...register('dish')}
            />
            <Textarea 
                placeholder="Observaciones"
                {...register('observations')}
            />
            <NumberInput 
                placeholder="Cantidad"
                {...register('quantity')}
            />
        </div>
        <div className="w-full flex justify-center items-center gap-10 my-6">
            <Button color="blue">Agregar Plato</Button>
        </div>
    </form>
  )
}

export default OrderItemForm