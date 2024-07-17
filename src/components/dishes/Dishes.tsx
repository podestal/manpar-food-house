import useGetDishes from "../../hooks/dishes/useGetDishes"

interface Props {
    selectedCategory: string
}

const Dishes = ({ selectedCategory }: Props) => {

    const {data: dishes, isLoading, isError, error} = useGetDishes()

    if (isLoading) return <p>Loading ....</p>

    if (isError) return <p>{error.message}</p>

  return (
    <div>
        <h2>Dishes</h2>
        <ul>
            {dishes
                ?.filter( dish => dish.category.toString() === selectedCategory || selectedCategory === '0')
                ?.map( dish => <li key={dish.id}>{dish.name}</li>)}
        </ul>
    </div>
  )
}

export default Dishes