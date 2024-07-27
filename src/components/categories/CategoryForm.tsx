import { z } from "zod"
import { Category } from "../../services/api/categoryServices"
import Panel from "../../utils/Panel"
import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js"
import useUserStore from "../../store/userStore"
import useErrorHandler from "../../store/errorHandling"
import { Button, Callout } from "@tremor/react"
import InputText from "../../utils/InputText"
import { UpdateCategoryData } from "../../hooks/categories/useUpdateCategory"
import { UseMutationResult } from "@tanstack/react-query"
import { CreateCategoryData } from "../../hooks/categories/useCreateCategory"

const schema = z.object({
    name: z.string().min(1, { message: 'Escriba el nombre de la categoría' }),
    description: z.string(),
})

type FormData = z.infer<typeof schema>

interface Props {
    category?: Category
    show: boolean
    setShow: (show: boolean) => void
    createCategory?: UseMutationResult<Category, Error, CreateCategoryData>
    updateCategory?: UseMutationResult<Category, Error, UpdateCategoryData>
}

const CategoryForm = ({ category, show, setShow, updateCategory, createCategory }: Props) => {

    // FORM HANDLER
    const {register, handleSubmit, formState, reset} = useForm<FormData>({ 
        resolver: zodResolver(schema), 
        values: {
            name: category?.name || '',
            description: category?.description || '',
        }
    })

    // AUTH
    const access = useUserStore(s => s.access)

    // ERROR HANDLER
    const {success, error, disable} = useErrorHandler()

    const onSubmit = (data: FieldValues) => {
        if (access) {
            if (category) {
                updateCategory?.mutate({
                    category: {name: data.name, description: data.description}, 
                    access
                })
            } else if (createCategory) {
                createCategory?.mutate({
                    category: {name: data.name, description: data.description},
                    access
                })
            }} 
    }

  return (
    <Panel
        show={show}
        setShow={setShow}
        reset={reset}
    >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-6">
            <h2 className="text-3xl text-slate-50">{category ? 'Actualizar Categoría' : 'Crear Categoría'}</h2>
            {success && <Callout color='teal' title="Creado">Plato {category ? 'Actualizado' : 'Creado'}</Callout>}
            {error && <Callout color='red' title="Error">Ocurrió un error, inténtelo más tarde</Callout>}
            <InputText 
                label="Nombre del Plato"
                register={register('name')}
                error={formState?.errors.name ? true : false}
                errorMessage={formState.errors.name?.message}
            />
            <InputText 
                label="Descripción"
                register={register('description')}
                error={formState?.errors.description ? true : false}
                errorMessage={formState.errors.description?.message}
            />
            <Button disabled={disable} color="blue" >{category ? 'Actualizar' : 'Crear'}</Button>
        </form>
    </Panel>
  )
}

export default CategoryForm