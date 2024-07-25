import { Button } from "@tremor/react"
import { useState } from "react"
import DishForm from "./DishForm"

const CreateDish = () => {

    const [show, setShow] = useState(false)

  return (
    <div className="w-full flex justify-center items-center">
        <Button onClick={() => setShow(true)} color="blue">Crear Plato</Button>
        <DishForm 
            show={show}
            setShow={setShow}
        />
    </div>
  )
}

export default CreateDish