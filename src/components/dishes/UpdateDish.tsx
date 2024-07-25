import { RiPencilFill } from "@remixicon/react"
import { Icon } from "@tremor/react"
import { Dish } from "../../services/api/dishServices"
import DishForm from "./DishForm"
import { useState } from "react"

interface Props {
    dish?: Dish
}

const UpdateDish = ({ dish }: Props) => {

    const [show, setShow] = useState(false)

  return (
    <>
        <Icon onClick={() => setShow(true)} className="hover:text-blue-700" color='blue' icon={RiPencilFill}/>
        <DishForm 
            show={show}
            setShow={setShow}
            dish={dish}
        />
    </>
  )
}

export default UpdateDish