import { RiPencilFill } from '@remixicon/react'
import { Icon } from '@tremor/react'
import { useState } from 'react'
import { Category } from '../../services/api/categoryServices'
import CategoryForm from './CategoryForm'

interface Props {
    category: Category
}

const UpdateCategory = ({ category }: Props) => {

    const [show, setShow] = useState(false)

  return (
    <>
        <Icon onClick={() => setShow(true)} className="cursor-pointer hover:text-blue-700" color='blue' icon={RiPencilFill}/>
        <CategoryForm 
            category={category}
            show={show}
            setShow={setShow}
        />
    </>
  )
}

export default UpdateCategory