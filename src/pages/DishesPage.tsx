import { useState } from "react"
import useDishImgStore from "../store/dishImgStore"
import CategoriesSelector from "../components/categories/CategoriesSelector"
import Categories from "../components/categories/Categories"
import CreateDish from "../components/dishes/CreateDish"
import CreateCategory from "../components/categories/CreateCategory"
import useUserStore from "../store/userStore"
import DishImage from "../components/dishImg/DishImage"

const DishesPage = () => {

    const [selectedCategory, setSelectedCategory] = useState('0')
    const dishId = useDishImgStore( s => s.dishId)
    const dishName = useDishImgStore( s => s.dishName)
    const access = useUserStore(s => s.access)

  return (
    <div className="relative min-h-screen w-full justify-evenly items-start flex flex-col">
        <div className="w-full sticky top-0 bg-slate-950 py-6 z-30">
            <DishImage 
                dishId={dishId}
                alt={dishName}
            />
            {/* {!access && <img className="w-[280px] h-[200px] lg:w-[360px] lg:h-[220px] object-cover mx-auto rounded-3xl" src={dishImg} alt="" />} */}
            <CategoriesSelector 
                setSelectedCategory={setSelectedCategory}
                allItems="Toda la carta"
            />
            <div className="flex justify-center items-center gap-6">
                {access && <CreateDish />}
                {access && <CreateCategory />}
            </div>
        </div>
        <Categories 
            selectedCategory={selectedCategory}
        />
    </div>
  )
}

export default DishesPage