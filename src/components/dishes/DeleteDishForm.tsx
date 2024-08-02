import { Button } from "@tremor/react"
import { Dish } from "../../services/api/dishServices"
import useRemoveDish from "../../hooks/dishes/useRemoveDish"
import useUserStore from "../../store/userStore"
import Panel from "../../utils/Panel" 

interface Props {
    show: boolean
    setShow: (show: boolean) => void
    dish: Dish
}

const DeleteDishForm = ({ show, setShow, dish }: Props) => {

    const removeDish = useRemoveDish(dish.id)
    const access = useUserStore(s => s.access)

    const handleRemoveDish = () => {
        if (access) {
            removeDish.mutate({ access })
        }
    }

  return (
    <Panel
        show={show}
        setShow={setShow}
    >
        <>
            <h1 className="text-3xl text-slate-50 w-[60%] text-center">Está seguro de eliminar el plato</h1>
            <div className="w-full flex justify-evenly item\">
                <Button onClick={handleRemoveDish} color="red">Confirmar</Button>
                <Button onClick={() => setShow(false)} color="blue">Volver</Button>
            </div>
        </>
    </Panel>
  )
}

export default DeleteDishForm