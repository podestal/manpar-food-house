import { useState } from "react"
import Categories from "../components/categories/Categories"
import Dishes from "../components/dishes/Dishes"

const DishesPage = () => {

    const [selectedCategory, setSelectedCategory] = useState('0')

  return (
    <div>
        <Categories 
            setSelectedCategory={setSelectedCategory}
        />
        <Dishes 
            selectedCategory={selectedCategory}
        />
    </div>
  )
}

export default DishesPage