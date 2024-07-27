import { RiPencilFill } from '@remixicon/react'
import { Icon } from '@tremor/react'
import { useState } from 'react'
import { Category } from '../../services/api/categoryServices'
import CategoryForm from './CategoryForm'
import useUpdateCategory from '../../hooks/categories/useUpdateCategory'
import useErrorHandler from '../../store/errorHandling'

interface Props {
    category: Category
}

const UpdateCategory = ({ category }: Props) => {

    const [show, setShow] = useState(false)
    const {handleSuccess, handleError} = useErrorHandler()

    const updateCategory = useUpdateCategory(category.id, handleSuccess, handleError)

  return (
    <>
        <Icon onClick={() => setShow(true)} className="cursor-pointer hover:text-blue-700" color='blue' icon={RiPencilFill}/>
        <CategoryForm 
            category={category}
            show={show}
            setShow={setShow}
            updateCategory={updateCategory}
        />
    </>
  )
}

export default UpdateCategory