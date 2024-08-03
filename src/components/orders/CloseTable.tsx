import useRemoveBill from '../../hooks/bills/useRemoveBill'
import { Button } from '@tremor/react'
import useUserStore from '../../store/userStore'
import { Table } from '../../services/api/tableService'
import { Order } from '../../services/api/orderService'

interface Props {
    billId: number
    table: Table
    orders: Order[]
    setError: (value:boolean) => void
    setSuccess: (value:boolean) => void
}

const CloseTable = ({ billId, table, orders, setError, setSuccess }: Props) => {

    if (!table.id) return null

    const ordersForTable = orders.filter( order => order.table === table.id)
    const removeBill = useRemoveBill(billId, table.id, setSuccess, setError)
    const access = useUserStore(s => s.access)
    

    const handleRemoveBill = () => {

        if (ordersForTable.length > 0) {
            setError(true)
            return 
        }

        if (access) {
            removeBill.mutate({access})
        }
    }

  return (
    <Button onDoubleClick={handleRemoveBill} className="ml-10 lg:ml-16" color="red">Cerrar Mesa</Button>
  )
}

export default CloseTable