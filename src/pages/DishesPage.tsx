import { useState } from "react"
import useDishImgStore from "../store/dishImgStore"
import CategoriesSelector from "../components/categories/CategoriesSelector"
import Categories from "../components/categories/Categories"

const DishesPage = () => {

    const [selectedCategory, setSelectedCategory] = useState('0')
    const dishImg = useDishImgStore( s => s.dishImg)

  return (
    <div className="relative min-h-screen w-full justify-evenly items-start flex flex-col">
        <div className="w-full sticky top-0 bg-slate-950 my-6">
            <img className="w-[280px] h-[200px] lg:w-[360px] lg:h-[220px] object-cover mx-auto rounded-3xl" src={dishImg} alt="" />
            <CategoriesSelector 
                setSelectedCategory={setSelectedCategory}
                allItems="Toda la carta"
            />
        </div>
        <Categories 
            selectedCategory={selectedCategory}
        />
        {/* <Dishes 
            selectedCategory={selectedCategory}
        /> */}
    </div>
  )
}

export default DishesPage