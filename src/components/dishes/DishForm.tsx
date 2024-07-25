import { Dish } from "../../services/api/dishServices"
import InputText from "../../utils/InputText"
import Panel from "../../utils/Panel"
import { Button, Switch } from "@tremor/react"
import CategoriesSelector from "../categories/CategoriesSelector"
import { z } from 'zod'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js"
import { useState } from "react"

const schema = z.object({
    dish: z.string().min(1, { message: 'Escriba el nombre del plato' }),
    description: z.string().min(1, { message: 'Agregue la descripción del plato' }),
    cost: z.string().min(1, { message: 'Agregue el precio del plato' }),
    category: z.string().min(1, { message: 'Agregue la categoría del plato' })
})

type FormData = z.infer<typeof schema>

interface Props {
    dish?: Dish
    show: boolean
    setShow: (show: boolean) => void
}

const DishForm = ({ dish, show, setShow }: Props) => {

    // FORM HANDLER
    const {register, handleSubmit, formState, reset} = useForm<FormData>({ 
        resolver: zodResolver(schema), 
        values: {
            dish: dish?.name || '',
            description: dish?.description || '',
            cost: dish?.cost.toString() || '',
            category: dish?.category.toString() || ''
        }
    })
    const [selectedCategory, setSelectedCategory] = useState('0')
    const [available, setAvailable] = useState<boolean>(dish?.available || true)

    //ERROR HANDLING
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [disable, setDisable] = useState(false)

    const handleSuccess = () => {
        setSuccess(true)
        setError(false)
        setDisable(true)
    }

    const onSubmit = (data: FieldValues) => {
        console.log('dsfasdfasdfsdfsadf');
        console.log('ggggggg');
        console.log('dish', data.dish)
        console.log('description', data.description)
        console.log('cost', data.cost)
        console.log('category', selectedCategory)
        console.log('available', available)
    }

  return (
    <Panel
        show={show}
        setShow={setShow}
    >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-6">
            <h2 className="text-3xl text-slate-50">{dish ? 'Actualizar Plato' : 'Crear Plato'}</h2>
            <p className="text-lg lg:text-xl text-slate-50 text-center">Disponible</p>
            <Switch 
                color='blue'
                checked={available}
                onChange={value => setAvailable(value)}
            />
            {/* <TextInput 
                placeholder="Plato"
                {...register('dish')}
                error={formState?.errors.dish ? true : false}
                errorMessage={formState.errors.dish?.message}
                
            /> */}
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
            />
            <Button color="blue" >{dish ? 'Actualizar' : 'Crear'}</Button>
        </form>
    </Panel>
    
  )
}

export default DishForm