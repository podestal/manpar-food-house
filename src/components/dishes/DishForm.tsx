import { Dish } from "../../services/api/dishServices"
import InputText from "../../utils/InputText"
import Panel from "../../utils/Panel"
import { Button, Callout } from "@tremor/react"
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
import Swtich from "../../utils/Swtich"
import useCreateDishImage from "../../hooks/dishImages/useCreateDishImage"
import DishImage from "../dishImg/DishImage"
import UpdateDishImage from "../dishImg/UpdateDishImage"

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
    const [img, setImg] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const createDishImage = useCreateDishImage()

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
    const [categoryError, setCategoryError] = useState('')
    const [available, setAvailable] = useState<boolean>(dish ? dish?.available : true)

    const onSubmit = async (data: FieldValues) => {
        
        setCategoryError('')

        if (access) {
            if (dish) {
                updateDish?.mutate({
                    dish: { 
                        ...dish, 
                        name: data.dish, 
                        description: data.description, 
                        cost: data.cost, 
                        category: parseInt(selectedCategory), 
                        available },
                    access
                })

            } else if (createDish) {
                
                if (selectedCategory === '0') {
                    setCategoryError('Seleccione una categoría')
                    return
                }

                if (!img) {
                    console.log('FALTA IMG');
                    return
                }

                try {
                    const newDish = await createDish.mutateAsync({
                        dish: { 
                            name: data.dish, 
                            description: data.description, 
                            cost: data.cost, 
                            category: parseInt(selectedCategory),
                            available, 
                            picture:'hhhhh' 
                        },
                        access
                    })
                    if (newDish.id && img) {
                        const formData = new FormData()
                        formData.append('image', img)
                        formData.append('dish', (newDish.id).toString())
                        await createDishImage.mutateAsync({ dishImage: formData, access})
                    }
                    setSelectedCategory('0')
                    setImg(null)
                    console.log('created dish', dish);
                    
                }
                catch (error) {
                    console.log(error)
                }
            }
        }
    }

  return (
    <Panel
        show={show}
        setShow={setShow}
        reset={reset}
        setPreview={setPreview}
    >
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-6">
            <h2 className="text-3xl text-slate-50">{dish ? 'Actualizar Plato' : 'Crear Plato'}</h2>
            {success && <Callout color='teal' title="Creado">Plato {dish ? 'Actualizado' : 'Creado'}</Callout>}
            {error && <Callout color='red' title="Error">Ocurrió un error, inténtelo más tarde</Callout>}
            <Swtich 
                value={available}
                setter={setAvailable}
                label="Disponible"
            />
            {!preview &&        
            <DishImage 
                dishId={dish?.id}
                alt={dish?.name}
            />}
            {dish 
            ? 
            <>
            {dish.image &&        
            <UpdateDishImage 
                dish={dish}
                dishImageId={dish.image}
                preview={preview}
                setPreview={setPreview}
            /> }
            </>
            : 
            <div className="flex flex-col items-center">
                {preview && (
                    <img 
                        src={preview} 
                        alt="Selected Image" 
                        className="object-cover my-10 w-[280px] h-[200px] lg:w-[360px] lg:h-[220px] rounded-3xl"
                    />
                )}
                <p className="text-lg lg:text-xl text-slate-50 text-center mb-6">Imagen del Plato</p>
                <input 
                    id="file-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={e => {
                        if (e.target.files) {
                            setImg(e.target.files[0])
                            setPreview(URL.createObjectURL(e.target.files[0]))
                        }
                    }}
                />
                <label 
                    htmlFor="file-upload" 
                    className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                    {dish ? 'Cambia de Imagen' : 'Selecciona un Imagen'}
                </label>
            </div>
            } 
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
            {/* <div className="w-full flex flex-col justify-center items-center gap-4">
                <label className="text-xl" htmlFor="observations">Observaciones</label>
                <Textarea 
                    id="observations"
                    value={}
                    onValueChange={value => setObservations(value)}
                    placeholder="Observaciones"
                />
            </div> */}
            <InputText 
                label="Precio"
                register={register('cost')}
                error={formState?.errors.cost ? true : false}
                errorMessage={formState.errors.cost?.message}
            />
            <CategoriesSelector 
                setSelectedCategory={setSelectedCategory}
                defaultCat={dish?.category.toString()}
                error={categoryError}
                errorSetter={setCategoryError}
            />
            <Button disabled={disable} color="blue" >{dish ? 'Actualizar' : 'Crear'}</Button>
        </form>
    </Panel>
    
  )
}

export default DishForm