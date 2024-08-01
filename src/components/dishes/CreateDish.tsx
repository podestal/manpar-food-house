import { Button } from "@tremor/react"
import { useState } from "react"
import DishForm from "./DishForm"
import usePostDish from "../../hooks/dishes/usePostDish"
import useErrorHandler from "../../store/errorHandling"

const CreateDish = () => {

    const [show, setShow] = useState(false)

    // DISH ID
    const [dishId, setDishId] = useState(47)

    // create a store to handle error

    //ERROR HANDLING
    const {handleSuccess, handleError} = useErrorHandler()

    const createDish = usePostDish(handleSuccess, handleError, setDishId)

  return (
    <div className="flex justify-center items-center">
        <Button onClick={() => setShow(true)} color="blue">Crear Plato</Button>
        <DishForm 
            show={show}
            setShow={setShow}
            createDish={createDish}
            dishId={dishId}
        />
    </div>
  )
}

export default CreateDish