import { Icon } from "@tremor/react"
import DeleteCategoryForm from "./DeleteCategoryForm"
import { useState } from "react"
import { Category } from "../../services/api/categoryServices"
import { RiDeleteBin2Fill } from "@remixicon/react"
import useRemoveCategory from "../../hooks/categories/useRemoveCategory"

interface Props {
    category: Category
}

const DeleteCategory = ({ category }: Props) => {

    const [show, setShow] = useState(false)
    const removeCategory = useRemoveCategory(category.id)

  return (
    <>
        <Icon onClick={() => setShow(true)} className="cursor-pointer hover:text-red-700" color="red" icon={RiDeleteBin2Fill}/>
        <DeleteCategoryForm 
            show={show}
            setShow={setShow}
            removeCategory={removeCategory}
        />
    </>
  )
}

export default DeleteCategory