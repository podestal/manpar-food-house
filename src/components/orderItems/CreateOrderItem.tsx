import OrderItemForm from "./OrderItemForm"
import { Table } from "../../services/api/tableService"

interface Props {
    show: boolean
    table: Table
    setShow: (value: boolean) => void
}

const CreateOrderItem = ({ show, setShow, table }: Props) => {
  return (
    <OrderItemForm 
        setShow={setShow}
        show={show}
        table={table}

    />
  )
}

export default CreateOrderItem