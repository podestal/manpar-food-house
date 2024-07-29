import Panel from "../../utils/Panel"
import { Button, NumberInput, TextInput } from "@tremor/react"
import { RiSearch2Line } from "@remixicon/react"
import { Table } from "../../services/api/tableService"

interface Props {
    show: boolean
    setShow: (value: boolean) => void
    table: Table
}


const OrderItemForm = ({ show, setShow, table }: Props) => {

    console.log('table in orderItemForm', table)
    

  return (
    <Panel
        show={show}
        setShow={setShow}
    >
        <form className="flex flex-col justify-center items-center gap-6">
            <h2 className="text-3xl text-slate-50">Agregar Plato</h2>
            <p>Order ID: {table.current_orders && table.current_orders[0].id}</p>
            <TextInput 
                placeholder="Plato"
                icon={RiSearch2Line}
            />
            <TextInput 
                placeholder="Observaciones"
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