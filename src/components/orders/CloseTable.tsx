import useRemoveBill from '../../hooks/bills/useRemoveBill'
import { Button } from '@tremor/react'
import useUserStore from '../../store/userStore'
import { Table } from '../../services/api/tableService'
import { Order } from '../../services/api/orderService'
import { useState } from 'react'

interface Props {
    billId: number
    table: Table
    orders: Order[]
    setError: (value:string) => void
    setSuccess: (value:string) => void
    setShow: (value:boolean) => void
}

const CloseTable = ({ billId, table, orders, setError, setSuccess, setShow }: Props) => {

    if (!table.id) return null

    const ordersForTable = orders.filter( order => order.table === table.id)
    const [loading, setLoading] = useState(false)
    const removeBill = useRemoveBill(billId, table.id, setSuccess, setError, setShow, setLoading)
    const access = useUserStore(s => s.access)
    

    const handleRemoveBill = () => {

        if (ordersForTable.length > 0) {
            setError('No se puede cerrar una mesa con órdenes')
            setTimeout(() => {
                setError('')
            },4000)
            return 
        }

        if (access) {
            removeBill.mutate({access})
        }
    }

  return (
    <Button onDoubleClick={handleRemoveBill} className="ml-10 lg:ml-16" color="red">{loading ? 'Cargando ...' : 'Cerrar Mesa'}</Button>
  )
}

export default CloseTable