import useGetDishes from "./hooks/dishes/useGetDishes"

const App = () => {

  const {data, isLoading, isError, error, isSuccess} = useGetDishes()

  if (isLoading) return <p>Loading ...</p>

  if (isError) return <p>{error.message}</p>

  if (data?.length === 0) return null

  return (
    <div>
      <h1 className="text-5xl font-bold">Dishes</h1>
      {data?.map( dish => (<p key={dish.id}>{dish.name}</p>))}
    </div>
  )
}

export default App
