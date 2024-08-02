import { Category } from "../../services/api/categoryServices"
import Dishes from "../dishes/Dishes"
import { motion } from "framer-motion"
import DeleteCategory from "./DeleteCategory"
import useUserStore from "../../store/userStore"
import UpdateCategory from "./UpdateCategory"
import { useState } from "react"

interface Props {
    category: Category
}

const CategoryCard = ({ category }: Props) => {

  if (!category.id) return null

  const access = useUserStore(s => s.access)

  const [show, setShow] = useState(false)

  const handleClick = () => {
    if (access) {
      setShow(true)
    }
  }

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
                show={show}
                setShow={setShow}
                category={category}
              />
            </div>
          }
          <h2
              onClick={handleClick} 
              className={`text-center text-3xl my-10 ${access && 'hover:bg-slate-900 px-6 py-4 rounded-3xl cursor-pointer'}`}>{category.name}
          </h2>
        </motion.div>
        <Dishes 
            selectedCategory={(category.id).toString()}
        />
    </div>
  )
}

export default CategoryCard