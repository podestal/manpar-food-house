import { Dish } from "../../services/api/dishServices"
import { DialogPanel, Dialog } from "@tremor/react"

interface Props {
    dish: Dish
    show: boolean
    setShow: (show: boolean) => void
}

const DishForm = ({ dish, show, setShow }: Props) => {
  return (
    <>
        <Dialog
            open={show}
            onClose={() => setShow(false)}
        >
            <DialogPanel>
                Hola
            </DialogPanel>
        </Dialog>
    </>
  )
}

export default DishForm