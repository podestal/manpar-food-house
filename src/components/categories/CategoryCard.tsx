import { Category } from "../../services/api/categoryServices"
import Dishes from "../dishes/Dishes"

interface Props {
    category: Category
}

const CategoryCard = ({ category }: Props) => {
  return (
    <div className="w-full">
        <h2 className=" text-center text-3xl">{category.name}</h2>
        <Dishes 
            selectedCategory={(category.id).toString()}
        />
    </div>
  )
}

export default CategoryCard