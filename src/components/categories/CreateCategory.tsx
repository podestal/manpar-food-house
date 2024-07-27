import { useState } from 'react'
import CategoryForm from './CategoryForm'
import { Button } from '@tremor/react'
import useCreateCategory from '../../hooks/categories/useCreateCategory'
import useErrorHandler from '../../store/errorHandling'

const CreateCategory = () => {

    const [show, setShow] = useState(false)
    const {handleSuccess, handleError} = useErrorHandler()
    const createCategory = useCreateCategory(handleSuccess, handleError)

  return (
    <div className="flex justify-center items-center">
        <Button onClick={() => setShow(true)} color="green">Crear Categoría</Button>
        <CategoryForm 
            show={show}
            setShow={setShow}
            createCategory={createCategory}
        />
    </div>
  )
}

export default CreateCategory