import { Dish } from "../../services/api/dishServices"
import InputText from "../../utils/InputText"
import Panel from "../../utils/Panel"
import { Button, Callout, Switch } from "@tremor/react"
import CategoriesSelector from "../categories/CategoriesSelector"
import { z } from 'zod'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js"
import { useState } from "react"
import useUserStore from "../../store/userStore"
import { PostDishData } from "../../hooks/dishes/usePostDish"
import { UseMutationResult } from "@tanstack/react-query"
import useErrorHandler from "../../store/errorHandling"

const schema = z.object({
    dish: z.string().min(1, { message: 'Escriba el nombre del plato' }),
    description: z.string().min(1, { message: 'Agregue la descripción del plato' }),
    cost: z.string().min(1, { message: 'Agregue el precio del plato' }),
})

type FormData = z.infer<typeof schema>

interface Props {
    dish?: Dish
    show: boolean
    setShow: (show: boolean) => void
    createDish?: UseMutationResult<Dish, Error, PostDishData>
    updateDish?: UseMutationResult<Dish, Error, PostDishData>
}

const DishForm = ({ 
        dish, 
        show, 
        setShow, 
        createDish, 
        updateDish,
    }: Props) => {

    // AUTH
    const access = useUserStore(s => s.access)

    // ERROR HANDLER
    const {success, error, disable} = useErrorHandler()

    // FORM HANDLER
    const {register, handleSubmit, formState, reset} = useForm<FormData>({ 
        resolver: zodResolver(schema), 
        values: {
            dish: dish?.name || '',
            description: dish?.description || '',
            cost: dish?.cost.toString() || '',
        }
    })
    const [selectedCategory, setSelectedCategory] = useState(dish ? dish?.category.toString(): '0')
    const [available, setAvailable] = useState<boolean>(dish ? dish?.available: true)

    const onSubmit = (data: FieldValues) => {
        if (access) {
            if (dish) {
                updateDish?.mutate({
                    dish: { ...dish, name: data.dish, description: data.description, cost: data.cost, category: parseInt(selectedCategory), available },
                    access
                })
            } else if (createDish) {
                createDish.mutate({
                    dish: { name: data.dish, description: data.description, cost: data.cost, category: parseInt(selectedCategory), available, picture: 'dfssdfsdf' },
                    access
                })
            }
        }
    }

  return (
    <Panel
        show={show}
        setShow={setShow}
        reset={reset}
    >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-6">
            <h2 className="text-3xl text-slate-50">{dish ? 'Actualizar Plato' : 'Crear Plato'}</h2>
            {success && <Callout color='teal' title="Creado">Plato {dish ? 'Actualizado' : 'Creado'}</Callout>}
            {error && <Callout color='red' title="Error">Ocurrió un error, inténtelo más tarde</Callout>}
            <p className="text-lg lg:text-xl text-slate-50 text-center">Disponible</p>
            <Switch 
                color='blue'
                checked={available}
                onChange={value => setAvailable(value)}
            />
            <InputText 
                label="Nombre del Plato"
                register={register('dish')}
                error={formState?.errors.dish ? true : false}
                errorMessage={formState.errors.dish?.message}
            />
            <InputText 
                label="Descripción"
                register={register('description')}
                error={formState?.errors.description ? true : false}
                errorMessage={formState.errors.description?.message}
            />
            <InputText 
                label="Precio"
                register={register('cost')}
                error={formState?.errors.cost ? true : false}
                errorMessage={formState.errors.cost?.message}
            />
            <p>Foto</p>
            <CategoriesSelector 
                setSelectedCategory={setSelectedCategory}
                defaultCat={dish?.category.toString()}
            />
            <Button disabled={disable} color="blue" >{dish ? 'Actualizar' : 'Crear'}</Button>
        </form>
    </Panel>
    
  )
}

export default DishForm