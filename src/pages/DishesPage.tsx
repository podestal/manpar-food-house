import { useState } from "react"
import Categories from "../components/categories/Categories"
import Dishes from "../components/dishes/Dishes"
import useDishImgStore from "../store/dishImgStore"

const DishesPage = () => {

    const [selectedCategory, setSelectedCategory] = useState('0')
    const dishImg = useDishImgStore( s => s.dishImg)

  return (
    <div className="relative min-h-screen w-full justify-evenly items-center flex max-lg:flex-col">
        <div className="w-full max-lg:sticky max-lg:top-0 bg-slate-950 my-6">
            <img className="w-[280px] h-[200px] lg:w-[400px] lg:h-[300px] object-cover mx-auto rounded-3xl" src={dishImg} alt="" />
            <Categories 
                setSelectedCategory={setSelectedCategory}
            />
        </div>
        <Dishes 
            selectedCategory={selectedCategory}
        />
    </div>
  )
}

export default DishesPage