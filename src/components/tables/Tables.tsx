import useGetTables from "../../hooks/tables/useGetTables"
import useUserStore from "../../store/userStore"
import Loading from "../../utils/Loading"
import TableItem from "./TableItem"


const Tables = () => {

    const access = useUserStore(s => s.access)
    let normalizeAccess = ''
    if (access !== null) {
      normalizeAccess = access
    }
    const {data: tables, isLoading, isError, error} = useGetTables(normalizeAccess)

    if (isLoading) return <Loading />
    if (isError) return <p>Error {error.message}</p>
  return (
    <div className="w-full text-center">
        <h2 className="text-6xl mb-10 lg:mb-20">Mesas</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-center">
        {tables?.map( table => (
            <TableItem 
                key={table.id}
                table={table}
            />
        ))}
    </div>
    </div>
  )
}

export default Tables