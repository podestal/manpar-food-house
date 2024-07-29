import { useState } from "react"
import { Table } from "../../services/api/tableService"
import CreateOrder from "../orders/CreateOrder"
import CreateOrderItem from "../orderItems/CreateOrderItem"

interface Props {
    table: Table
}

const TableItem = ({ table }: Props) => {

    if (!table.current_orders) return null

    const [show, setShow] = useState(false)
    const ordersToShow = table.current_orders.length


  return (
    <>
        <div
        onClick={() => setShow(true)}
        className={`p-14 ${ordersToShow === 0 ? 'bg-blue-700 hover:bg-blue-800' : 'bg-amber-700 hover:bg-amber-800'}  mx-auto rounded-full  text-slate-50 hover:text-slate-300 cursor-pointer`}>
            <p className="text-xl font-bold">{table.number}</p>
        </div>
        {ordersToShow === 0 
        ? 
        <CreateOrder 
            setShow={setShow}
            show={show}
            tableId={table.id}
        />
        :   
        <CreateOrderItem 
            show={show}
            setShow={setShow}
            table={table}
        />}
    </>
  )
}

export default TableItem