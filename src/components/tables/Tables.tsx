import useGetTables from "../../hooks/tables/useGetTables"
import TableItem from "./TableItem"


const Tables = () => {

    const {data: tables, isLoading, isError, error} = useGetTables()

    if (isLoading) return <p>Cargando ...</p>

    if (isError) return <p>Error {error.message}</p>
  return (
    <div className="grid grid-cols-3 gap-10 text-center">
        {tables?.map( table => (
            <TableItem 
                key={table.id}
                table={table}
            />
        ))}
    </div>
  )
}

export default Tables