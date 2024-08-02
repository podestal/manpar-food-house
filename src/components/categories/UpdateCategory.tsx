import { Category } from '../../services/api/categoryServices'
import CategoryForm from './CategoryForm'
import useUpdateCategory from '../../hooks/categories/useUpdateCategory'
import useErrorHandler from '../../store/errorHandling'

interface Props {
    category: Category
    show: boolean
    setShow: (value: boolean) => void
}

const UpdateCategory = ({ category, show, setShow }: Props) => {

    const {handleSuccess, handleError} = useErrorHandler()

    const updateCategory = useUpdateCategory(category.id, handleSuccess, handleError)

  return (
    <>
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