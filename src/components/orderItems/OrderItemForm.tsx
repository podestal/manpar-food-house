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
import { Dish } from "../../services/api/dishServices"
import { useState } from "react"

const schema = z.object({
    observations: z.string(),
    quantity: z.string().min(1, { message: 'Porfavor ingrese una cantidad mayor a 0' })
})

type FormData = z.infer<typeof schema>

interface Props {
    order: Order
    createOrderItem: UseMutationResult<OrderItem, Error, CreateOrderItemData>
    dishes: Dish[]
}

const OrderItemForm = ({ order, createOrderItem, dishes }: Props) => {

    const access = useUserStore(s => s.access)

    const [searchDish, setSearchDish] = useState('')
    const [filteredDishes, setFilteredDishes] = useState(dishes)
    const [showOptions, setShowOptions] = useState(false)
    const [selectedDish, setSelectedDish] = useState<any>(0)

    const {register, handleSubmit, reset} = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const onSubmit = (data: FieldValues) => {
        if (access) {
            try {
                createOrderItem.mutate({orderItem: {dish: selectedDish, order: order.id, observations: data.observations, quantity: parseInt(data.quantity)}, access})
                reset()
                setSearchDish('')
                setSelectedDish(0)
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    const onError = (error: any) => {
        console.log(error)
        
    }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col justify-center items-center w-[300px] max-lg:w-[200px] gap-6">
            <div>
                <TextInput 
                    placeholder="Plato"
                    icon={RiSearch2Line}
                    // {...register('dish')}
                    value={searchDish}
                    onValueChange={value => {
                        setSearchDish(value)
                        const filtered = dishes.filter(dish => dish.name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
                        setFilteredDishes(filtered)
                        setShowOptions(true)
                    }}
                />
                {showOptions && searchDish.length > 0 &&
                <>
                    {filteredDishes.map( filteredDish => (
                        <div className="my-4 px-6 py-2 hover:bg-blue-700 rounded-3xl">
                            <p onClick={() => {
                            setShowOptions(false)
                            setSearchDish(filteredDish.name)
                            setSelectedDish(filteredDish.id)
                        }} key={filteredDish.id}>{filteredDish.name}</p>
                        </div>
                    ))}
                </>
                }
            </div>
            
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