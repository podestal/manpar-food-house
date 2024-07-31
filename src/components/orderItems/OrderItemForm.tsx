import { Button, Callout, NumberInput, TextInput, Textarea } from "@tremor/react"
import { RiSearch2Line } from "@remixicon/react"
import { Order } from "../../services/api/orderService"
import { UseMutationResult } from "@tanstack/react-query"
import { CreateOrderItemData } from "../../hooks/orderItem/useCreateOrderItem"
import { OrderItem } from "../../services/api/orderItemService"
import useUserStore from "../../store/userStore"
import { Dish } from "../../services/api/dishServices"
import { useState } from "react"
import useErrorHandler from "../../store/errorHandling"
import {motion, AnimatePresence} from 'framer-motion'

interface Props {
    order: Order
    createOrderItem: UseMutationResult<OrderItem, Error, CreateOrderItemData>
    dishes: Dish[]
}

const OrderItemForm = ({ order, createOrderItem, dishes }: Props) => {

    const access = useUserStore(s => s.access)

    // ERROR MESSAGES
    const {success, error, handleReset} = useErrorHandler()

    // INPUT STATE
    const [observations, setObservations] = useState('')
    const [quantity, setQuality] = useState(0)

    // SEARCH STATE
    const [searchDish, setSearchDish] = useState('')
    const [filteredDishes, setFilteredDishes] = useState(dishes)
    const [showOptions, setShowOptions] = useState(false)
    const [selectedDish, setSelectedDish] = useState<any>(0)

    //ERROR HANDLER
    const [quantityError, setQuantityError] = useState(false)
    const [dishError, setDishError] = useState(false)



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setQuantityError(false)
        setDishError(false)

        if (quantity <= 0) {
            setQuantityError(true)
            return
        }

        if (!searchDish) {
            setDishError(true)
            return
        }

        if (access) {
            try {
                createOrderItem.mutate({orderItem: {dish: selectedDish, order: order.id, observations, quantity}, access})
                setSearchDish('')
                setSelectedDish(0)
                setObservations('')
                setQuality(0)
                setTimeout(() => {
                    handleReset()
                }, 4000)
            }
            catch (error) {
                console.log(error)
            }
        }
    }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-6">
        <AnimatePresence>
            {success && 
            <motion.div             
                initial={{opacity: 0, translateY: -60}}
                whileInView={{opacity: 1, translateY: 0}}
                transition={{duration: 0.8}}
                exit={{opacity: 0, translateY: 200}}
            >
                <Callout color="teal" title='Agregado'>Se agregó el plato a la orden</Callout>
            </motion.div>}
            {error && 
            <motion.div             
                initial={{opacity: 0, translateY: -60}}
                whileInView={{opacity: 1, translateY: 0}}
                transition={{duration: 0.8}}
                exit={{opacity: 0, translateY: 200}}
            >
                <Callout color='red' title="Error">Ocurrió un error</Callout>
            </motion.div>}
        </AnimatePresence>

        <div className="flex flex-col justify-center items-center w-[300px] max-lg:w-[200px] gap-6">
            <div className="w-full flex flex-col justify-center items-center gap-4">
                <label className="text-xl" htmlFor="dish">Plato</label>
                <TextInput 
                    id="dish"
                    placeholder="Plato"
                    icon={RiSearch2Line}
                    autoComplete="off"
                    error={dishError}
                    errorMessage="Tiene que seleccionar un plato"
                    value={searchDish}
                    onValueChange={value => {
                        setDishError(false)
                        setSearchDish(value)
                        const filtered = dishes.filter(dish => dish.name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
                        setFilteredDishes(filtered)
                        setShowOptions(true)
    
                    }}
                />
                {showOptions && searchDish.length > 0 &&
                <>
                    {filteredDishes.map( filteredDish => (
                        <div key={filteredDish.id} className="my-4 px-6 py-2 hover:bg-blue-700 rounded-3xl">
                            <p onClick={() => {
                            setShowOptions(false)
                            setSearchDish(filteredDish.name)
                            setSelectedDish(filteredDish.id)
                        }}>{filteredDish.name}</p>
                        </div>
                    ))}
                </>
                }
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-4">
                <label className="text-xl" htmlFor="observations">Observaciones</label>
                <Textarea 
                    id="observations"
                    value={observations}
                    onValueChange={value => setObservations(value)}
                    placeholder="Observaciones"
                />
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-4">
                <label className="text-xl" htmlFor="quantity">Cantidad</label>
                <NumberInput 
                    id="quantity"
                    value={quantity}
                    onValueChange={value => {
                        setQuantityError(false)
                        setQuality(value)}}
                    placeholder="Cantidad"
                    error={quantityError}
                    errorMessage="La cantidad debe de ser mayor a 0"
                />
            </div>
        </div>
        <div className="w-full flex justify-center items-center gap-10 my-6">
            <Button color="blue">Agregar Plato</Button>
        </div>
    </form>
  )
}

export default OrderItemForm