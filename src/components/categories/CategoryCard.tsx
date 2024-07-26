import { Category } from "../../services/api/categoryServices"
import Dishes from "../dishes/Dishes"
import { motion } from "framer-motion"
import DeleteCategory from "./DeleteCategory"
import useUserStore from "../../store/userStore"
import UpdateCategory from "./UpdateCategory"

interface Props {
    category: Category
}

const CategoryCard = ({ category }: Props) => {

  const access = useUserStore(s => s.access)

  return (
    <div className="w-full">
        <motion.div 
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{duration: 0.8}}
        className="flex justify-center items-center gap-4">
          {access &&
            <div className="flex justify-center items-center gap-4">
              <DeleteCategory 
                category={category}
              />
              <UpdateCategory 
                category={category}
              />
            </div>
          }
          <h2 
              className=" text-center text-3xl my-10">{category.name}
          </h2>
        </motion.div>
        <Dishes 
            selectedCategory={(category.id).toString()}
        />
    </div>
  )
}

export default CategoryCard