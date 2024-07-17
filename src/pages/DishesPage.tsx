import { useState } from "react"
import Categories from "../components/categories/Categories"
import Dishes from "../components/dishes/Dishes"
import useDishImgStore from "../store/dishImgStore"

const DishesPage = () => {

    const [selectedCategory, setSelectedCategory] = useState('0')
    const dishImg = useDishImgStore( s => s.dishImg)

  return (
    <div>
        <img className="w-[500px] mx-auto rounded-3xl" src={dishImg} alt="" />
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