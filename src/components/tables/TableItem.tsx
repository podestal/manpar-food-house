import { useState } from "react"
import { Table } from "../../services/api/tableService"
import Orders from "../orders/Orders"
import useCreateBill from "../../hooks/bills/useCreateBill"
import useUserStore from "../../store/userStore"

interface Props {
    table: Table
}

const TableItem = ({ table }: Props) => {

    if (!table.id) return null

    const [show, setShow] = useState(false) 
    const access = useUserStore(s => s.access)

    const createBill = useCreateBill(table.id)

    const handleOpenTable = () => {
        if (access && table.id) {
            try {
                !table.bill && createBill.mutate({bill: {table: table.id}, access})
                setShow(true)
            }
            catch (error) {
                console.log(error)
            }
        }
    }

  return (
    <>  
        <div
        onClick={handleOpenTable}
        className={`p-14 ${!table.bill ? 'bg-blue-700 hover:bg-blue-800' : 'bg-amber-700 hover:bg-amber-800'}  mx-auto rounded-full  text-slate-50 hover:text-slate-300 cursor-pointer`}>
            <>{console.log('table', table)}</>
            <p className="text-xl font-bold">{table.number}</p>
        </div>

        {show && <Orders
            setShow={setShow}
            show={show}
            table={table}
        />}
    </>
  )
}

export default TableItem