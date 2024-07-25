import { Dish } from "../../services/api/dishServices"
import { DialogPanel, Dialog } from "@tremor/react"
import InputText from "../../utils/InputText"

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
                <h2>Edita tu Plato</h2>
            </DialogPanel>
        </Dialog>
    </>
  )
}

export default DishForm