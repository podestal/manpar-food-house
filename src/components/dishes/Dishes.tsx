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
    <div className="my-2 w-full">
        <ul className="flex flex-col gap-10">
            {dishes
                ?.filter( dish => dish.category.toString() === selectedCategory)
                ?.map( dish => <DishCard key={dish.id} dish={dish}/>)}
        </ul>
    </div>
  )
}

export default Dishes