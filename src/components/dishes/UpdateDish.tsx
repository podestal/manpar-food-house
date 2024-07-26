import { RiPencilFill } from "@remixicon/react"
import { Icon } from "@tremor/react"
import { Dish } from "../../services/api/dishServices"
import DishForm from "./DishForm"
import { useState } from "react"
import useUpdateDish from "../../hooks/dishes/useUpdateDish"
import useErrorHandler from "../../store/errorHandling"

interface Props {
    dish?: Dish
}

const UpdateDish = ({ dish }: Props) => {

    const [show, setShow] = useState(false)

    //ERROR HANDLING
    const {handleSuccess, handleError} = useErrorHandler()

    const updateDish = useUpdateDish(dish?.id, handleSuccess, handleError)

  return (
    <>
        <Icon onClick={() => setShow(true)} className="hover:text-blue-700" color='blue' icon={RiPencilFill}/>
        <DishForm 
            show={show}
            setShow={setShow}
            dish={dish}
            updateDish={updateDish}
        />
    </>
  )
}

export default UpdateDish