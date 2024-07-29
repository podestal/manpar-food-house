import { useState } from "react"
import { Table } from "../../services/api/tableService"
import CreateOrder from "../orders/CreateOrder"

interface Props {
    table: Table
}

const TableItem = ({ table }: Props) => {

    const [show, setShow] = useState(false)

  return (
    <>
        <div
        onClick={() => setShow(true)}
        className={`p-14 ${table.is_available ? 'bg-blue-700' : 'bg-amber-700'} mx-auto rounded-full hover:bg-blue-800 text-slate-50 hover:text-slate-300 cursor-pointer`}>
            <p className="text-xl font-bold">{table.number}</p>
        </div>
        <CreateOrder 
            setShow={setShow}
            show={show}
            tableId={table.id}
        />
    </>
  )
}

export default TableItem