import useGetDishes from "../../hooks/dishes/useGetDishes"
import DishCard from "./DishCard"

interface Props {
    selectedCategory: string
}

const Dishes = ({ selectedCategory }: Props) => {

    const {data: dishes, isLoading, isError, error} = useGetDishes()

    if (isLoading) return <p>Loading ....</p>

    if (isError) return <p>{error.message}</p>

  return (
    <div className="my-10">
        <h2 className="my-10 text-6xl text-center">Nuestra Carta</h2>
        <ul className="flex flex-col gap-10">
            {dishes
                ?.filter( dish => dish.category.toString() === selectedCategory || selectedCategory === '0')
                ?.map( dish => <DishCard key={dish.id} dish={dish}/>)}
        </ul>
    </div>
  )
}

export default Dishes