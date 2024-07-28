import { useState } from "react"
import { Table } from "../../services/api/tableService"
import OrderForm from "../orders/OrderForm"

interface Props {
    table: Table
}

const TableItem = ({ table }: Props) => {

    const [show, setShow] = useState(false)

  return (
    <>
        <div
        onClick={() => setShow(true)}
        className=" p-14 bg-blue-700 mx-auto rounded-full hover:bg-blue-800 text-slate-50 hover:text-slate-300 cursor-pointer">
            <p className="text-xl font-bold">{table.number}</p>
        </div>
        <OrderForm 
            show={show}
            setShow={setShow}
        />
    </>
  )
}

export default TableItem