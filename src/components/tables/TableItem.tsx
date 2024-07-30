import { useState } from "react"
import { Table } from "../../services/api/tableService"
import Orders from "../orders/Orders"

interface Props {
    table: Table
}

const TableItem = ({ table }: Props) => {

    if (!table.current_orders) return null

    const [show, setShow] = useState(false)


  return (
    <>  
        <div
        onClick={() => setShow(true)}
        className={`p-14 ${table.current_orders && table.current_orders.length === 0 ? 'bg-blue-700 hover:bg-blue-800' : 'bg-amber-700 hover:bg-amber-800'}  mx-auto rounded-full  text-slate-50 hover:text-slate-300 cursor-pointer`}>
            <p className="text-xl font-bold">{table.number}</p>
        </div>

        <Orders 
            setShow={setShow}
            show={show}
            orders={table.current_orders}
            tableId={table.id}
        />
    </>
  )
}

export default TableItem