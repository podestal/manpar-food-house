import { RiDeleteBin2Fill } from "@remixicon/react"
import { Icon } from "@tremor/react"
import DeleteDishForm from "./DeleteDishForm"
import { useState } from "react"
import { Dish } from "../../services/api/dishServices"

interface Props {
    dish: Dish
}

const RemoveDish = ({ dish }: Props) => {

    const [show, setShow] = useState(false)

  return (
    <>
        <Icon onClick={() => setShow(true)} className="hover:text-red-700" color="red" icon={RiDeleteBin2Fill}/>
        <DeleteDishForm 
            show={show}
            setShow={setShow}
            dish={dish}
        />
    </>
  )
}

export default RemoveDish