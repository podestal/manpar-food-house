import usePostOrder from "../../hooks/orders/useCreateOrders"
import useUpdateTable from "../../hooks/tables/useUpdateTable"
import useErrorHandler from "../../store/errorHandling"
import OrderForm from "./OrderForm"

interface Props {
    show: boolean
    setShow: (value: boolean) => void
    tableId: number | undefined
}

const CreateOrder = ({ show, setShow, tableId }: Props) => {

    const {handleError, handleSuccess} = useErrorHandler()

    const createOrder = usePostOrder(handleSuccess, handleError)

    const updateTable = useUpdateTable(tableId)

  return (
    <OrderForm 
        show={show}
        setShow={setShow}
        createOrder={createOrder}
        tableId={tableId}
        updateTable={updateTable}
    />
  )
}

export default CreateOrder