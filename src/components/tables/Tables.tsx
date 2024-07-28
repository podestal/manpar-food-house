import useGetTables from "../../hooks/tables/useGetTables"

const Tables = () => {

    const {data} = useGetTables()

  return (
    <div>
        {console.log('data', data)}
    </div>
  )
}

export default Tables