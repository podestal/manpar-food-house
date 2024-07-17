import useGetCategories from "./hooks/categories/useGetCategories"
import useGetDishes from "./hooks/dishes/useGetDishes"

const App = () => {

  const {data: categories, isLoading, isError, error} = useGetCategories()

  if (isLoading) return <p>Loading ...</p>

  if (isError) return <p>{error.message}</p>

  return (
    <div>
      <h1 className="text-5xl font-bold">Dishes</h1>
      {/* {data?.map( dish => (<p key={dish.id}>{dish.name}</p>))} */}
      {categories?.map( cat => (<p key={cat.id}>{cat.name}</p>))}
    </div>
  )
}

export default App
