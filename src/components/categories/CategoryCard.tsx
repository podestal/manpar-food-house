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

// Component responsible for rendering a single category card with related actions and dishes
const CategoryCard = ({ category }: Props) => {

  // Early return if the category doesn't have an ID, indicating invalid or missing data
  if (!category.id) return null

  // Access token or credentials retrieved from the user's store
  const access = useUserStore(s => s.access)

  // Local state to manage the visibility of the update category form/modal
  const [show, setShow] = useState(false)

  // Handler function for click events on the category name
  // This will only trigger if the user has access (is authenticated)
  const handleClick = () => {
    if (access) {
      setShow(true)
    }
  }

  return (
    <div className="w-full">
        {/* Animation wrapper using Framer Motion for smooth transitions */}
        <motion.div 
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          transition={{duration: 0.8}}
          className="flex justify-center items-center gap-4">
          {/* Conditional rendering: Only show update and delete options if the user has access */}
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
          {/* Category name, clickable if the user has access */}
          <h2
              onClick={handleClick} 
              className={`text-center text-3xl my-10 ${access && 'hover:bg-slate-900 px-6 py-4 rounded-3xl cursor-pointer'}`}>{category.name}
          </h2>
        </motion.div>
        {/* Render the Dishes component, passing the selected category ID as a prop */}
        <Dishes 
            selectedCategory={(category.id).toString()}
        />
    </div>
  )
}

export default CategoryCard