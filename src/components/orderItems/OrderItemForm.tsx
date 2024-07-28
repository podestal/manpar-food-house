import Panel from "../../utils/Panel"
import InputText from "../../utils/InputText"
import { Button, NumberInput } from "@tremor/react"

interface Props {
    show: boolean
    setShow: (value: boolean) => void
}


const OrderItemForm = ({ show, setShow }: Props) => {
  return (
    <Panel
        show={show}
        setShow={setShow}
    >
        <form className="flex flex-col justify-center items-center gap-6">
            <h2 className="text-3xl text-slate-50">Agregar Plato</h2>
            <InputText 
                label="Plato"
            />
            <InputText 
                label="Observaciones"
            />
            <div className="flex flex-col justify-center items-center w-[300px] max-lg:w-[200px] gap-6">
                <p className="text-lg lg:text-xl text-slate-50 text-center">Cantidad</p>
                <NumberInput 
                    placeholder="Cantidad"
                />
            </div>
            <div className="w-full flex justify-center items-center gap-10 my-6">
                <Button color="blue">Crear</Button>
                <Button color="red">Cancelar</Button>
            </div>
        </form>
    </Panel>
  )
}

export default OrderItemForm