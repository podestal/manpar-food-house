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
import { UpdateDishtData } from "../../hooks/dishes/useUpdateDish"

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
    updateDish?: UseMutationResult<Dish, Error, UpdateDishtData>
}

const DishForm = ({ 
        dish, 
        show, 
        setShow, 
        createDish, 
        updateDish,
    }: Props) => {

    // IMG
    const [img, setImg] = useState<any>()

    // AUTH
    const access = useUserStore(s => s.access)
    const dishImg = dish?.dishImg ?  dish?.dishImg : dish?.picture

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

    console.log('dish', dish);

    const onSubmit = (data: FieldValues) => {

        const formData = new FormData()
        formData.append('dishImg', img)
        formData.append('name', data.dish);
        formData.append('description', data.description);
        formData.append('cost', data.cost);
        formData.append('category', selectedCategory);
        formData.append('available', String(available));
        formData.append('picture', 'picture')
        console.log('formData', formData);
        console.log('available', available);
        console.log('dish', dish);
        
        
        if (access) {
            if (dish) {
                updateDish?.mutate({
                    dish: { ...dish, name: data.dish, description: data.description, cost: data.cost, category: parseInt(selectedCategory), available },
                    access
                })
            } else if (createDish) {
                createDish.mutate({
                    dish: formData,
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
            <img className="my-10 w-[280px] h-[200px] lg:w-[360px] lg:h-[220px] rounded-3xl" src={dish?.dishImg} alt={dish?.name} />
            {createDish && <input 
                type="file"
                accept="image/*"
                onChange={e => {
                    if (e.target.files) {
                        console.log(e.target.files[0])
                        
                        setImg(e.target.files[0])
                    }
                }}
            />}
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