import { Dish } from "../../services/api/dishServices"
import DishForm from "./DishForm"
import useUpdateDish from "../../hooks/dishes/useUpdateDish"
import useErrorHandler from "../../store/errorHandling"

interface Props {
    dish?: Dish
    show: boolean
    setShow: (value: boolean) => void
}

const UpdateDish = ({ dish, show, setShow }: Props) => {

    //ERROR HANDLING
    const {handleSuccess, handleError} = useErrorHandler()

    const updateDish = useUpdateDish(dish?.id, handleSuccess, handleError)

  return (
    <>
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