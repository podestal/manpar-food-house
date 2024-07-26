import { Button } from "@tremor/react"
import { Category } from "../../services/api/categoryServices"
import Panel from "../../utils/Panel"
import useUserStore from "../../store/userStore"
import { DeleteCategoryData } from "../../hooks/categories/useRemoveCategory"
import { UseMutationResult } from "@tanstack/react-query"

interface Props {
    show: boolean
    setShow: (show: boolean) => void
    removeCategory: UseMutationResult<Category, Error, DeleteCategoryData>
}

const DeleteCategoryForm = ({ show, setShow, removeCategory }: Props) => {

    const access = useUserStore(s => s.access)

    const handleRemoveCategory = () => {
        if (access) {
            removeCategory.mutate({ access })
        }
    }

  return (
    <Panel
        show={show}
        setShow={setShow}
    >
        <>
            <h1 className="text-3xl text-slate-50">Está seguro de eliminar el plato</h1>
            <div className="w-full flex justify-evenly item\">
                <Button onClick={handleRemoveCategory} color="red">Confirmar</Button>
                <Button onClick={() => setShow(false)} color="blue">Volver</Button>
            </div>
        </>
    </Panel>
  )
}

export default DeleteCategoryForm