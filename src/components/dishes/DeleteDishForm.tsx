import { Button, Dialog, DialogPanel } from "@tremor/react"
import { Dish } from "../../services/api/dishServices"
import useRemoveDish from "../../hooks/dishes/useRemoveDish"
import useUserStore from "../../store/userStore"

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
    <Dialog
        open={show}
        onClose={() => setShow(false)}
    >
        <DialogPanel>
            <h1>Está seguro de eliminar el plato</h1>
            <Button onClick={handleRemoveDish} color="red">Si</Button>
        </DialogPanel>
    </Dialog>
  )
}

export default DeleteDishForm