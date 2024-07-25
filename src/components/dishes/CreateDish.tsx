import { Button } from "@tremor/react"
import { useState } from "react"
import DishForm from "./DishForm"
import usePostDish from "../../hooks/dishes/usePostDish"

const CreateDish = () => {

    const [show, setShow] = useState(false)
    const createDish = usePostDish()

  return (
    <div className="w-full flex justify-center items-center">
        <Button onClick={() => setShow(true)} color="blue">Crear Plato</Button>
        <DishForm 
            show={show}
            setShow={setShow}
            createDish={createDish}
        />
    </div>
  )
}

export default CreateDish