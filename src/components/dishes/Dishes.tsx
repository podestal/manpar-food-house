import useGetDishes from "../../hooks/dishes/useGetDishes"
import useUserStore from "../../store/userStore"
import DishCard from "./DishCard"
import Loading from "../../utils/Loading"

interface Props {
    selectedCategory: string | undefined
}

const Dishes = ({ selectedCategory }: Props) => {

    const access = useUserStore(s => s.access)

    const {data: dishes, isLoading, isError, error} = useGetDishes()

    if (isLoading) return <Loading />

    if (isError) return <p>{error.message}</p>

  return (
    <div className="my-2 w-full">
        <ul className="flex flex-col gap-10">

            {access 
            ? 
            dishes
                ?.filter( dish => dish.category.toString() === selectedCategory)
                ?.map( dish => <DishCard key={dish.id} dish={dish}/>)
            : 
            dishes
                ?.filter( dish => dish.available)
                ?.filter( dish => dish.category.toString() === selectedCategory)
                ?.map( dish => <DishCard key={dish.id} dish={dish}/>)
            }
        </ul>
    </div>
  )
}

export default Dishes