import { Category } from "../../services/api/categoryServices"
import Dishes from "../dishes/Dishes"
import { motion } from "framer-motion"

interface Props {
    category: Category
}

const CategoryCard = ({ category }: Props) => {
  return (
    <div className="w-full">
        <motion.h2 
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 0.8}}
            className=" text-center text-3xl my-10">{category.name}</motion.h2>
        <Dishes 
            selectedCategory={(category.id).toString()}
        />
    </div>
  )
}

export default CategoryCard